#!/bin/bash
RED='\033[0;31m' 
GREEN='\033[0;32m'
BLUE='\033[0;34m'
WHITE='\033[0;37m' 
NC='\033[0m'

echo -e "${BLUE}Adding data to DB is started: ${GREEN}"

lines=(`cat "src/dummy-db/backup.json"`)

# Write user data
USER_LINE_START=3
USER_LINE_END=30

echo -ne "[" > "src/dummy-db/user.json"
for (( c=$USER_LINE_START; c<=$USER_LINE_END; c++ ))
do
   echo -ne "${lines[$c]}" >> "src/dummy-db/user.json"
done
echo -ne "]" >> "src/dummy-db/user.json"

echo -ne '#####                     (33%)\r'

# Write emails data
EMAIL_LINE_START=34
EMAIL_LINE_END=130
echo -ne "[" > "src/dummy-db/email.json"
for (( c=$EMAIL_LINE_START; c<=$EMAIL_LINE_END; c++ ))
do
   echo -ne "${lines[$c]}" >> "src/dummy-db/email.json"
done
echo -ne "]" >> "src/dummy-db/email.json"

echo -ne '#############             (66%)\r'

# Write todos data
EMAIL_LINE_START=134
EMAIL_LINE_END=198
echo -ne "[" > "src/dummy-db/todo.json"
for (( c=$EMAIL_LINE_START; c<=$EMAIL_LINE_END; c++ ))
do
   echo -ne "${lines[$c]}" >> "src/dummy-db/todo.json"
done

echo -ne '#######################   (100%)\r'
echo -ne '\n'
echo -e "${BLUE}Adding data to DB is done! ${NC}"
