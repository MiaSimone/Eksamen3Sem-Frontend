#!/usr/bin/env bash
​
FOLDER="eksamen3sem"
DROPLET_URL="miadefries.com"
​
npm run build
scp -r ./build/* root@$DROPLET_URL:/var/www/$FOLDER