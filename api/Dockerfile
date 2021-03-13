# Build Stage
FROM node:14.15.1 AS base

WORKDIR /usr/src/app

COPY package.json .

RUN yarn run knex:install

EXPOSE 9200 4001 5601
