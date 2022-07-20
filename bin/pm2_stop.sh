#!/usr/bin/env bash

# Check if pm2 command is installed
pm2 -v

if [ $? != 0 ]; then
    echo "-- PM2 is not installed"
fi

SERVICE_NAME="app_modul3_service"

pm2 stop $SERVICE_NAME
