#!/bin/bash

# TODO cache meteor properly
#
# Example:
#
# if [ -d ~/.meteor ]; then sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor; fi
# if [ ! -e $HOME/.meteor/meteor ]; then curl https://install.meteor.com | sh; fi
#

if ! [ -x "$(command -v meteor)" ]; then
  git clone git://github.com/meteor/meteor.git ~/meteor
  cd ~/meteor
  # 1.4.3.1
  git checkout 954333b8136835de5933b46aa08400f0f73538ed
  git submodule foreach 'git fetch && git fetch --tags'
  git submodule update --init --recursive
  cd -
fi
