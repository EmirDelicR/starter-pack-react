#!/bin/bash

RED='\033[0;31m' 
GREEN='\033[0;32m'
BLUE='\033[0;34m'
WHITE='\033[0;37m' 
NC='\033[0m'

IMAGE_TAG_BACKEND='application_backend'
IMAGE_TAG_FRONTEND='application_frontend'

docker-compose down

# List containers
sudo docker ps -a

# List docker images
sudo docker images

echo -e "${BLUE}Do you want to remove docker image.${RED}"
read -e -p "[yes/no]: " -i "no" remove_docker_image

if [ "$remove_docker_image" == "yes" ]; then
    # Remove image
    sudo docker image rm ${IMAGE_TAG_BACKEND}:latest
    echo -e "${GREEN}Backend image is removed!"
    sudo docker image rm ${IMAGE_TAG_FRONTEND}:latest
    echo -e "${GREEN}Backend image is removed!"
elif [ "$remove_docker_image" == "no" ]; then
    echo -e "${WHITE}Image is not removed!"    
else 
    echo -e "${WHITE}Image is not removed! Try to type ${RED}[yes/no] ${WHITE}next time."
fi

echo -e "${BLUE}Do you want to remove node docker image.${RED}"
read -e -p "[yes/no]: " -i "no" remove_node_image

if [ "$remove_node_image" == "yes" ]; then
    # Remove image
    sudo docker image rm node:20-alpine
    echo -e "${GREEN}Node image is removed!"
elif [ "$remove_node_image" == "no" ]; then
    echo -e "${WHITE}Image is not removed!"    
else 
    echo -e "${WHITE}Image is not removed! Try to type ${RED}[yes/no] ${WHITE}next time."
fi
