# Build Stage
FROM node:14.15.1 AS base

WORKDIR /usr/src/app

COPY package.json .

RUN yarn run knex:install
RUN yarn run expo-cli:install

EXPOSE 3000 4001 19000 19001 19002
