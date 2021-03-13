# Build Stage
FROM node:12.19-slim AS base

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
FROM node:12.19-slim

ARG PORT
RUN echo "PORT: $PORT"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production
COPY --from=base /usr/src/app/build ./build
COPY --from=base /usr/src/app/.sequelizerc ./build
COPY --from=base /usr/src/app/docker-entrypoint.sh ./build
COPY --from=base /usr/src/app/config ./build/config
COPY --from=base /usr/src/app/node_modules ./build/node_modules
COPY --from=base /usr/src/app/package-lock.json ./build/package-lock.json
COPY --from=base /usr/src/app/package.json ./build/package.json
RUN echo $(ls -a)

WORKDIR ./build
RUN echo $(ls -a)

EXPOSE $PORT
ENTRYPOINT [ "./docker-entrypoint.sh" ]
