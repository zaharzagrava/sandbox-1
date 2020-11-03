# Build Stage
FROM node:alpine AS base

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build

# Production Stage
FROM nginx

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base build /usr/share/nginx/html

EXPOSE 80