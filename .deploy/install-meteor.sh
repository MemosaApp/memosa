#!/bin/bash

if ! [ -x "$(command -v meteor)" ]; then
  git clone git://github.com/meteor/meteor.git ~/meteor
  cd ~/meteor
  git checkout tags/release/METEOR@1.4.2.3
  git submodule foreach 'git fetch && git fetch --tags'
  git submodule update --init --recursive
  cd -
fi
