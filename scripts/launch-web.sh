#!/bin/bash

kill $(lsof -t -i:3000)
npm start --prefix ./web
