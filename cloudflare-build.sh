#!/bin/sh

# build the react-together package
npm run build
npm link

# build the website
cd website
npm i
npm link react-together
npm run build
