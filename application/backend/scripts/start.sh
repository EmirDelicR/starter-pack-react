#!/bin/bash
RED='\033[0;31m' 
GREEN='\033[0;32m'
BLUE='\033[0;34m'
WHITE='\033[0;37m' 
NC='\033[0m'

echo -e "${BLUE}-- Setting up project --"

echo -e "1. Creating logs directory."
mkdir -m 777 src/logs
echo -e "${GREEN} Successfuly created logs directory."

echo -e "${RED}2. Deleting log data."
echo '' > src/logs/error.log
echo '' > src/logs/request.log 
echo -e "${GREEN} Successfuly deleted log data."

echo -e "${BLUE}3. Populate database with data."
/bin/bash scripts/populate_data.sh
echo -e "${GREEN} Successfuly added data."

echo -e "${BLUE}4. Creating and populating .env file."
touch .env && chmod 777 .env
echo -en "HOST='localhost'\nPORT='3100'\nAUTH_PASSWORD_SALT='encription-salt'\nAUTH_JWT_SECRET='jwt-secret'\nAUTH_JWT_EXPIRES='24h'\nAUTH_JWT_REFRESH_SECRET='jwt-refresh-secret'\nAUTH_JWT_REFRESH_EXPIRES='48h'" > .env 
echo -e "${GREEN} Successfuly added data to .env file."

echo -e "${BLUE}5. Installing and starting project."
npm i && npm start
