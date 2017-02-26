#!/bin/bash

! npm start &
# Wait 2 seconds
sleep 120
meteor npm run acceptance
a=$?
! kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`
exit "$a"
