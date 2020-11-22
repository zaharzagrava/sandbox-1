# Not used
# Build Stage
FROM node:14.15.1-slim AS base

WORKDIR /usr/src/app

ARG PORT
RUN echo "PORT: $PORT"

COPY package*.json ./
RUN npm install
COPY . .
RUN echo $(ls -a)

RUN npm run build
RUN echo $(ls -a)

# Production Stage
FROM node:14.15.1-slim

ARG PORT
RUN echo "PORT: $PORT"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production
COPY --from=base /usr/src/app/build ./build
COPY docker-entrypoint-dev.sh ./build/docker-entrypoint-dev.sh
COPY node_modules ./build/node_modules
# To be able to use npm scripts
COPY package.json ./build/package.json
RUN echo $(ls -a)

WORKDIR ./build
RUN echo $(ls -a)

EXPOSE $PORT
ENTRYPOINT [ "./docker-entrypoint-dev.sh" ]
