#!/bin/bash

kill $(lsof -t -i:3001)
npm start --prefix ./api
