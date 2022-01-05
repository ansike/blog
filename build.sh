#!/bin/bash

node -v

yarn build

cp db.json ./public
