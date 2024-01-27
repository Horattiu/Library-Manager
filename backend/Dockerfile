FROM node:20-alpine

WORKDIR /app

COPY . .        

RUN npm install

EXPOSE 8001

ENV NODE_ENV production

CMD npm start
