FROM node:12-alpine as builder
WORKDIR /front_react
COPY package.json .
RUN npm install
COPY . .
RUN npm run build