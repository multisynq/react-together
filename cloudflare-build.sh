#!/bin/bash
set -x
exec 2>&1

RESULT=FAILURE

function notify {
    if [ -z "CF_PAGES" ]; then
        echo "Not running on Cloudflare Pages, skipping notification"
        return
    fi
    ./cloudflare-notify.sh "$RESULT" || true
}
trap notify EXIT

node --version
npm --version

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
npm run build || exit 1
npm link || exit 1

# build the website
cd website
mv -v package-lock.json package-lock.json.orig
npm i || exit 1
npm link react-together || exit 1
npm run build || exit 1

# for debugging
cp -v package*.json dist/
echo diffing package-lock.*
diff -u package-lock.json.orig package-lock.json > dist/package-lock.diff || true

# set RESULT for EXIT trap
RESULT=SUCCESS
