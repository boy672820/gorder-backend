#!/bin/sh

# echo "wait database.."
# dockerize -wait tcp://postgres:5432 -timeout 20s

echo "Run application"
npm run migrate:dev && \
npx prisma generate && \
npm run dev
