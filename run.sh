#!/bin/bash

helpMenu() {
  echo "Usage: $0 [OPTIONS]"
  echo " Options"
  echo "  -f : fetch data"
  echo "  -v : viewer"
}

while getopts 'fvh' c
do
  case $c in
    f) ACTION=FETCH ;;
    v) ACTION=VIEW ;;
    *) helpMenu
       exit ;;
  esac
done

if [ "${ACTION}" = "FETCH" ]; then
  docker-compose run --rm python-service
elif [ "${ACTION}" = "VIEW"  ]; then
  docker-compose up frontend-service
else
  helpMenu
fi
