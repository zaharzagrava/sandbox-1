#!/bin/bash

echo "--- Migrating dev db ---"
npx knex migrate:latest

echo "--- Seeding dev db ---"
npx knex seed:run

echo "--- Starting dev ---"
npm run dev
