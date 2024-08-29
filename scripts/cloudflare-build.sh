#!/bin/bash
set -x
set -Eeo pipefail
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
trap notify EXIT ERR

# if a branch arg is provided, checkout scripts from that branch unless we are already on it
SCRIPT_BRANCH=$1

if [ -n "$SCRIPT_BRANCH" -a -n "$CF_PAGES_BRANCH" ]; then
    if [ "$CF_PAGES_BRANCH" != "$SCRIPT_BRANCH" ]; then
        git branch -a
        git fetch --depth=1 origin $SCRIPT_BRANCH:$SCRIPT_BRANCH
        git branch -a
        ls -la
        git ls-tree main --name-only
        FILES=`git ls-tree $SCRIPT_BRANCH --name-only | grep '^cloudflare'`
        git checkout $SCRIPT_BRANCH $FILES
        ls -la
        git status
        # now call the script again without the branch argument
        exec $0
        # this script will exit and the new one will run
    fi
fi

# now that we are on the correct branch, start building

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

# write version info of build to file
version="$DIR/../website/dist/version.txt"
git log -1 --pretty=format:"Branch: %D%nCommit: %H%nMerge: %P%nAuthor: %an%nDate:   %ad%n%n    %s%n" > $version

# set RESULT for EXIT trap
RESULT=SUCCESS
