# Dockerfile-frontend

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5174

ENV REACT_APP_BACKEND_URL https://backend-librarymanager.onrender.com/

CMD npm run dev
