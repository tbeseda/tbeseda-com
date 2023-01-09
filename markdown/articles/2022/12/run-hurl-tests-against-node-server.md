---
title: Run Hurl tests against a Node.js server
published: 2022-12-01 00:01 -0700
edited: 2023-01-08 19:30 -0700
---

```bash
#!/bin/bash
set -eu # throw if things go bad

echo "Booting server"
npm run start &
serverPid=$!

sleep 2 # a smarter script would ping server

echo -e "\nRunning Hurl tests\n"
npx hurl --test test/integration/*.hurl

echo -e "Stopping server <${serverPid}>"
kill $serverPid
```
