#!/bin/bash

npm install --prefix ./api
npm run init-db --prefix ./api &api_pid="$!"
npm install --prefix ./web
echo installation completed successfully
kill "$api_pid"