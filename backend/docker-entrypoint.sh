#!/bin/sh

echo "$NODE_ENV"

echo "Creating the database"
npx sequelize-cli db:create

echo "Running migration on the database"
npx sequelize-cli db:migrate

npm run docker-start