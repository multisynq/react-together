#!/bin/bash
set -euo pipefail

# Function to display usage information
usage() {
    echo "Usage: $0 [playground|website]"
    exit 1
}

# Function to clean up background processes
cleanup() {
    echo "Cleaning up background processes..."
    for pid in "${pids[@]}"; do
        kill "$pid" 2>/dev/null || true
    done
}


# Check if an argument is provided
if [ $# -ne 1 ]; then
    usage
fi

target="$1"
case "$target" in
    playground|website)
        ;;
    *)
        echo "Error: Invalid target. Must be 'playground' or 'website'."
        usage
        ;;
esac

set -x

pids=()

# Get packages to build and watch from the 'packages' directory
PACKAGES_DIR="packages"
PACKAGES=($(ls -d "$PACKAGES_DIR"/*/ | xargs -n 1 basename))

# Build (synchronously) all the packages - first run
for package in "${PACKAGES[@]}"; do
    npm run build -w "$package"
done

trap cleanup EXIT

# Run the target
npm run dev -w $target &
pids+=($!)

# Watch changes in packages & rebuild
for package in "${PACKAGES[@]}"; do
    npm run watch -w "$package" &
    pids+=($!)
done

wait