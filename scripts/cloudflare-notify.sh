#!/bin/bash
# Send a slack message to announce a new deployment

RESULT=$1
if [ -z "$RESULT" ]; then
    echo "Usage: $0 <SUCCESS|FAILURE>"
    exit 1
fi

# CF_* environment variables are provided by Cloudflare
REQUIRED=(SLACK_HOOK_URL CF_PAGES_BRANCH CF_PAGES_COMMIT_SHA CF_PAGES_URL)
MISSING=()
for required in ${REQUIRED[@]} ; do
    if [[ -z "${!required}" ]] ; then
        MISSING+=($required)
    fi
done

if [ ${#MISSING[@]} -gt 0 ] ; then
    echo "=== Slack Hook: missing required environment variables ==="
    for var in ${MISSING[@]} ; do
        echo "  $var"
    done
    exit 1
fi

case "$CF_PAGES_BRANCH" in
    deploy)
        X="🚀"
        ENV_LABEL="Production"
        URL="https://reacttogether.dev"
        ;;
    main)
    develop)
    staging)
        X="👁️"
        ENV_LABEL="${CF_PAGES_BRANCH^}"
        URL="https://${CF_PAGES_BRANCH}.reacttogether.dev"
        ;;
    *)
        X="🔧"
        ENV_LABEL="Branch"
        # guess Cloudflare's preview branch URL from the branch name
        BRANCH_HOST=$(echo $CF_PAGES_BRANCH | sed -r 's [^-a-zA-Z0-9] - g;s -+ - g' | tr A-Z a-z | cut -c 1-28)
        URL="https://${BRANCH_HOST}.reacttogether.pages.dev"
        ;;
esac

if [ "$RESULT" = "FAILURE" ]; then
    JSON="{\"text\": \"❌ *ReactTogether: Deployment to ${ENV_LABEL} site failed* ❌\n${ENV_LABEL}: ${URL}\nCommit: \`${CF_PAGES_BRANCH}@${CF_PAGES_COMMIT_SHA}\`\"}"
else
    JSON="{\"text\": \"${X} *ReactTogether: Deployed to ${ENV_LABEL} site* ${X}\n${ENV_LABEL}: ${URL}\nCommit: \`${CF_PAGES_BRANCH}@${CF_PAGES_COMMIT_SHA}\` (${CF_PAGES_URL})\"}"
fi

echo
echo "=== Sending slack message ==="
curl -sSX POST -H 'Content-type: application/json' --data "${JSON}" $SLACK_HOOK_URL


