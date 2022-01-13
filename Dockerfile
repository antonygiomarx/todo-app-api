FROM node:14.17.3-stretch-slim

RUN apt-get update && apt-get upgrade -y && apt-get install openssl -y

WORKDIR /usr/src/app

COPY . .

RUN npm install yarn

RUN yarn install

RUN yarn build

RUN npx prisma generate

EXPOSE 3000/tcp

CMD ["node", "./dist/src/main.js"]

