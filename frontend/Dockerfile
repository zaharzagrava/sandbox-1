# Build Stage
FROM node:12.19-slim AS base

ARG REACT_APP_API_URL
RUN echo "REACT_APP_API_URL: $REACT_APP_API_URL"

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Production Stage
FROM nginx

COPY --from=base nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base build /usr/share/nginx/html

EXPOSE 80