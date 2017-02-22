#!/bin/bash

eval $(ssh-agent -s)
ssh-add ~/.ssh/memosa-dev

mkdir ~/temp
cd ~/temp

apt-get update
apt-get install git nodejs build-essential
ln -s /usr/bin/nodejs /usr/bin/node

if [ ! -x "$(command -v meteor)"]; then
  curl https://install.meteor.com/ | sh
fi

if [ ! -x "$(command -v mup)"]; then
  npm install -g mup
fi

git clone git@gitlab.com:memosa/memosa.git memosa

cd memosa

meteor npm install

cd ./.deploy-dev

mup setup
METEOR_ALLOW_SUPERUSER=true mup deploy

cd ../../
rm -rf temp
