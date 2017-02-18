#!/bin/bash

if ! [ -x "$(command -v meteor)" ]; then
  git clone git://github.com/meteor/meteor.git ~/meteor
  cd ~/meteor
  # git checkout tags/release/METEOR@1.4.2.3
  git checkout 8d76fb01ff4f3cb251609e20003ef793c64de4c8
  git submodule foreach 'git fetch && git fetch --tags'
  git submodule update --init --recursive
  cd -
fi
