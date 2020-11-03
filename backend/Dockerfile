# Build Stage
FROM node:current-slim AS base

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build

# Production Stage
FROM node:current-slim

RUN adduser myuser
USER myuser

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install --production
COPY --from=base /usr/src/app/build ./build

COPY .sequelizerc ./build/

WORKDIR ./build

RUN db:create
RUN db:migrate

EXPOSE 4000
CMD ["npm", "docker-start"]
