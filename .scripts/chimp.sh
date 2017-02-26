#!/bin/bash

! npm start &
# Wait 2 seconds
sleep 120
meteor npm run acceptance
a=$?
kill $!
wait $! 2>/dev/null
exit "$a"
