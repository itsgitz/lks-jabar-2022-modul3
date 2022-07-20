#!/usr/bin/env bash

SERVICE_NAME="app_modul3_service"

# Check if pm2 command is installed
pm2 -v

if [ $? != 0 ]; then
    echo "-- PM2 is not installed"
fi

# Just in case there's another application process that started by
# previous `npm run start` command, we need to stop the current process
pm2 delete $SERVICE_NAME

if [ $? != 0 ]; then
    echo "-- There are no running process at this time, skip deleting pm2 process"
fi

echo "-- Start PM2 process for the application"
pm2 --name $SERVICE_NAME \
    start npm -- run setup
