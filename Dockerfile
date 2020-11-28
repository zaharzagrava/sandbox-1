# Build Stage
FROM node:14.15.1-slim AS base

WORKDIR /usr/src/app

EXPOSE 3000 4001 19002
