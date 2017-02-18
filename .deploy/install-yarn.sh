#!/bin/bash

if ! [ -x "$(command -v yarn)" ]; then
  echo 'Installing yarn'
  curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.16.1
fi
