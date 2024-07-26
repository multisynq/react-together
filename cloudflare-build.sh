#!/bin/bash

# cloudflare installs arm versions from package-lock.json
# but actuallty runs on x64 so we need to install the x64 versions
npm i || exit 1

# build the react-together package
npm run build || exit 1
npm link || exit 1

# build the website
cd website
npm i || exit 1
npm link react-together || exit 1
npm run build || exit 1

