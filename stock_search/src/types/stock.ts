export interface StockData {
  会社名?: string;
  銘柄コード?: string;
  コード?: string;
  業種?: string;
  優先市場?: string;
  市場タイプ?: "JP" | "US";
  決算月?: string | null;
  // "会計基準"?: string | null;
  都道府県?: string | null;
  時価総額?: number | null;
  PBR?: number | null;
  売上高?: number | null;
  営業利益?: number | null;
  営業利益率?: number | null;
  当期純利益?: number | null;
  純利益率?: number | null;
  ROE?: number | null;
  自己資本比率?: number | null;
  "PER(会予)"?: number | null;
  // "PER"?: number | null;  // 情報的に不確かなためコメントアウト
  "PER(過去12ヶ月)"?: number | null; // trailingPE（過去12ヶ月分）
  "PER(前年度)"?: number | null; // 前年度のPER（前年度末の株価と前年度のEPSから計算）
  配当方向性?: number | null; // payoutRatio（生データ、小数、例: 0.3 = 30%）
  配当利回り?: number | null; // trailingAnnualDividendYield（生データ、小数、例: 0.03 = 3%）
  "EPS(過去12ヶ月)"?: number | null; // trailingEps（生データ）
  "EPS(予想)"?: number | null; // forwardEps（生データ）
  "EPS(前年度)"?: number | null; // 前年度のEPS（前年度のNet IncomeとDiluted Average Sharesから計算）
  負債?: number | null;
  流動負債?: number | null;
  流動資産?: number | null;
  総負債?: number | null;
  現金及び現金同等物?: number | null;
  投資有価証券?: number | null;
  "ネットキャッシュ（流動資産-負債）"?: number | null;
  ネットキャッシュ比率?: number | null;

  // グレアム式 Margin of Safety 指標（CSV由来ではなくフロントエンドで計算する派生列）
  推定株価?: number | null; // PER(過去12ヶ月) × EPS(過去12ヶ月)
  "一株純資産(BPS)"?: number | null; // 推定株価 / PBR
  グレアム数?: number | null; // sqrt(22.5 × EPS × BPS)
  "安全余裕率(グレアム数)"?: number | null; // (グレアム数 - 推定株価) / グレアム数（小数）
  "PER×PBR"?: number | null; // グレアムの複合バリュエーション基準（22.5以下が目安）
  "NCAV(グレアム式)"?: number | null; // 流動資産 - 負債（投資有価証券は加味しない）
  NCAV比率?: number | null; // NCAV(グレアム式) / 時価総額（小数、1.5=150%）
  流動比率?: number | null; // 流動資産 / 流動負債（倍率）

  _source_file?: string;
  _row_index?: number;
  [key: string]: string | number | null | undefined; // Allow additional dynamic properties
}

export interface SearchFilters {
  companyName: string;
  stockCode?: string; // 銘柄コード検索
  industries: string[]; // 複数業種選択
  market: string[]; // 複数市場選択
  marketType?: ("JP" | "US")[]; // 市場タイプ選択（日本株/米国株）
  prefecture: string[]; // 複数都道府県選択

  // 既存のフィルター
  marketCapMin: number | null;
  marketCapMax: number | null;
  pbrMin: number | null;
  pbrMax: number | null;
  roeMin: number | null;
  roeMax: number | null;

  // 新しい財務データフィルター
  revenueMin: number | null; // 売上高
  revenueMax: number | null;
  operatingProfitMin: number | null; // 営業利益
  operatingProfitMax: number | null;
  operatingMarginMin: number | null; // 営業利益率
  operatingMarginMax: number | null;
  netProfitMin: number | null; // 当期純利益
  netProfitMax: number | null;
  netMarginMin: number | null; // 純利益率
  netMarginMax: number | null;
  equityRatioMin: number | null; // 自己資本比率
  equityRatioMax: number | null;
  forwardPEMin: number | null; // PER(会予)
  forwardPEMax: number | null;
  trailingPEMin: number | null; // PER(過去12ヶ月)（trailingPE、過去12ヶ月分）
  trailingPEMax: number | null;
  previousYearPEMin: number | null; // PER(前年度)
  previousYearPEMax: number | null;
  dividendDirectionMin: number | null; // 配当方向性（%）
  dividendDirectionMax: number | null;
  dividendYieldMin: number | null; // 配当利回り
  dividendYieldMax: number | null;
  trailingEpsMin: number | null; // EPS(過去12ヶ月)
  trailingEpsMax: number | null;
  forwardEpsMin: number | null; // EPS(予想)
  forwardEpsMax: number | null;
  previousYearEpsMin: number | null; // EPS(前年度)
  previousYearEpsMax: number | null;
  totalLiabilitiesMin: number | null; // 負債
  totalLiabilitiesMax: number | null;
  currentLiabilitiesMin: number | null; // 流動負債
  currentLiabilitiesMax: number | null;
  currentAssetsMin: number | null; // 流動資産
  currentAssetsMax: number | null;
  totalDebtMin: number | null; // 総負債
  totalDebtMax: number | null;
  cashMin: number | null; // 現金及び現金同等物
  cashMax: number | null;
  investmentsMin: number | null; // 投資有価証券
  investmentsMax: number | null;
  netCashMin: number | null; // ネットキャッシュ
  netCashMax: number | null;
  netCashRatioMin: number | null; // ネットキャッシュ比率
  netCashRatioMax: number | null;

  // グレアム式 Margin of Safety フィルタ
  grahamMarginOfSafetyMin: number | null; // 安全余裕率(グレアム数)（%）
  grahamMarginOfSafetyMax: number | null;
  perPbrMin: number | null; // PER×PBR（グレアムの複合バリュエーション基準）
  perPbrMax: number | null;
  currentRatioMin: number | null; // 流動比率（倍）
  currentRatioMax: number | null;
  ncavRatioMin: number | null; // NCAV比率（%）
  ncavRatioMax: number | null;
}

export interface SortConfig {
  key: keyof StockData;
  direction: "asc" | "desc";
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

/** お気に入り銘柄（ブラウザの localStorage に保存） */
export interface FavoriteItem {
  code: string;
  name?: string;
}

export const MARKET_OPTIONS = [
  "プライム（内国株式）",
  "スタンダード（内国株式）",
  "グロース（内国株式）",
] as const;

export const US_MARKET_OPTIONS = [
  "NYSE",
  "NASDAQ",
  "AMEX",
] as const;

export const MARKET_TYPE_OPTIONS = ["JP", "US"] as const;

export const ITEMS_PER_PAGE_OPTIONS = [50, 100, 200] as const;
