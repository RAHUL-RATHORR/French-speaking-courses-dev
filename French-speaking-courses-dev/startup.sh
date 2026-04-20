#!/bin/bash
echo "Startup script executed"
echo "Starting the application"
git status
git pull
echo "Installing dependencies"
npm i --legacy-peer-deps
npm run build
pm2 stop upifraud
pm2 start --name upifraud
echo "Application started"
