#!/bin/bash

kill $(lsof -t -i:3001)
npm start --prefix ./api &api_pid="$!"
kill $(lsof -t -i:3000)
npm start --prefix ./web &web_pid="$!"
npm test --prefix ./web
kill "$api_pid"
kill "$web_pid"
