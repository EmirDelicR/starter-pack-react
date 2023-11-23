#!/bin/bash
RED='\033[0;31m' 
GREEN='\033[0;32m'
BLUE='\033[0;34m'
WHITE='\033[0;37m' 
NC='\033[0m'

echo -e "${BLUE}Confirm that you want to dump log data.${RED}"
read -e -p "[yes/no]: " -i "no" log_delete_confirm

if [ "$log_delete_confirm" == "yes" ]; then
    echo '' > src/logs/error.log
    echo '' > src/logs/request.log 
    echo -e "${GREEN}Data is removed!"
elif [ "$log_delete_confirm" == "no" ]; then
    echo -e "${WHITE}Log data is not deleted!"    
else 
    echo -e "${WHITE}Log data is not deleted! Try to type ${RED}[yes/no] ${WHITE}next time."
fi

echo -e "${BLUE}Confirm that you want to dump dummy-db data.${RED}"
echo -e "Warrning this will delete all data in every file in dummy-db folder!"
read -e -p "[yes/no]: " -i "no" db_delete_confirm

if [ "$db_delete_confirm" == "yes" ]; then
    echo "[]" > src/dummy-db/email.json
    echo "[]" > src/dummy-db/todo.json
    echo "[]" > src/dummy-db/user.json
    echo -e "${GREEN}Data is removed!"
elif [ "$db_delete_confirm" == "no" ]; then
    echo -e "${WHITE}DB data is not deleted!"    
else 
    echo -e "${WHITE}DB data is not deleted! Try to type ${RED}[yes/no] ${WHITE}next time."
fi