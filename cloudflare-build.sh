#!/bin/bash

# cloudflare clean-installs arm versions from package-lock.json
# but actuallty runs on x64 so we need to install the x64 versions
if [ -n "$CF_PAGES" ]; then
    echo "Running on Cloudflare Pages, installing x64 versions"
    npm i \
        @ast-grep/napi-linux-x64-gnu \
        @rollup/rollup-linux-x64-gnu \
        @swc/core-linux-x64-gnu \
    || exit 1
else
    echo "Running on local machine, deleting node_modules and clean-installing packages"
    rm -rf node_modules website/node_modules
    npm ci || exit 1
fi

# build the react-together package
npm run build
npm link

# build the website
cd website
rm -r node_modules package-lock.json
npm i
npm link react-together
npm run build
