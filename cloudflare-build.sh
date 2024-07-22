#!/bin/bash

# cloudflare runs build on linux-x64-gnu
npm i @ast-grep/napi-linux-x64-gnu

# build the react-together package
npm run build
npm link

# build the website
cd website
npm i
npm link react-together
npm run build
