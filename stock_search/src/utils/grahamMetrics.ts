import type { StockData } from "../types/stock";

/**
 * ベンジャミン・グレアムの Margin of Safety 関連指標を計算する。
 *
 * 前提: PER(過去12ヶ月)・EPS(過去12ヶ月)・PBR は既存CSVの生値をそのまま使う。
 * グレアム数系の指標は黒字企業（EPS>0）かつPBR>0でなければ意味を持たないため、
 * 条件を満たさない場合はすべて null を返す（赤字企業を「割安」と誤判定しないため）。
 */

const toPositiveNumber = (value: unknown): number | null => {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) && num > 0 ? num : null;
};

const toFiniteNumber = (value: unknown): number | null => {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : null;
};

export const calculateGrahamMetrics = (
  stock: StockData
): Partial<StockData> => {
  const per = toPositiveNumber(stock["PER(過去12ヶ月)"]);
  const eps = toPositiveNumber(stock["EPS(過去12ヶ月)"]);
  const pbr = toPositiveNumber(stock.PBR);
  const currentAssets = toFiniteNumber(stock.流動資産);
  const currentLiabilities = toPositiveNumber(stock.流動負債);
  const totalLiabilities = toFiniteNumber(stock.負債);
  const marketCap = toPositiveNumber(stock.時価総額);

  const result: Partial<StockData> = {
    推定株価: null,
    "一株純資産(BPS)": null,
    グレアム数: null,
    "安全余裕率(グレアム数)": null,
    "PER×PBR": null,
    "NCAV(グレアム式)": null,
    NCAV比率: null,
    流動比率: null,
  };

  // 推定株価・BPS・グレアム数・安全余裕率（黒字企業かつPBR>0の場合のみ）
  if (per !== null && eps !== null && pbr !== null) {
    const estimatedPrice = per * eps;
    const bps = estimatedPrice / pbr;

    result.推定株価 = estimatedPrice;
    result["一株純資産(BPS)"] = bps;

    if (bps > 0) {
      const grahamNumber = Math.sqrt(22.5 * eps * bps);
      result.グレアム数 = grahamNumber;
      result["安全余裕率(グレアム数)"] =
        grahamNumber > 0 ? (grahamNumber - estimatedPrice) / grahamNumber : null;
    }
  }

  // PER×PBR（グレアムの複合バリュエーション基準、EPSの黒字条件は不要）
  if (per !== null && pbr !== null) {
    result["PER×PBR"] = per * pbr;
  }

  // NCAV（グレアム式正味流動資産）と NCAV比率
  if (currentAssets !== null && totalLiabilities !== null) {
    const ncav = currentAssets - totalLiabilities;
    result["NCAV(グレアム式)"] = ncav;

    if (marketCap !== null) {
      result.NCAV比率 = ncav / marketCap;
    }
  }

  // 流動比率
  if (currentAssets !== null && currentLiabilities !== null) {
    result.流動比率 = currentAssets / currentLiabilities;
  }

  return result;
};

export const enrichWithGrahamMetrics = (data: StockData[]): StockData[] =>
  data.map((stock) => ({ ...stock, ...calculateGrahamMetrics(stock) }));
