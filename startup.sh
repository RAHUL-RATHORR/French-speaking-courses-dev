#!/bin/bash
echo "Startup script executed"
echo "Starting the application"
git status
git pull
echo "Installing dependencies"
npm i --legacy-peer-deps
npm run build
pm2 delete french-skills || true
pm2 start ecosystem.config.js --env production
echo "Application started"
