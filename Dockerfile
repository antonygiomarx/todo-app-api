FROM node:14.17.1-buster-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install yarn

RUN yarn install

RUN yarn build

CMD ["node", "./dist/src/main.js"]

