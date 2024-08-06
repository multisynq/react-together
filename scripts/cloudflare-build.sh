#!/bin/bash
set -x
set -eo pipefail
exec 2>&1

cd `dirname $0`
DIR=`pwd`

RESULT=FAILURE

function notify {
    if [ -z "CF_PAGES" ]; then
        echo "Not running on Cloudflare Pages, skipping notification"
        return
    fi
    $DIR/cloudflare-notify.sh "$RESULT" || true
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
    npm run clean
    npm ci
fi

# build the react-together package
npm run build || exit 1

# set RESULT for EXIT trap
RESULT=SUCCESS
