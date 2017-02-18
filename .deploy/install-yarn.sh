#!/bin/bash

if ! [ -x "$(command -v yarn)" ]; then
  yarn install
fi
