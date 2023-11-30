FROM node

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]