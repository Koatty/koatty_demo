#!/bin/bash

echo "install nodejs modules ----------------------------------"
cd /data && yarn install -s

echo "start pm2 -----------------------------------------------"
pm2 startOrGracefulReload /pm2.json

echo "running -------------------------------------------------"
pm2 log
