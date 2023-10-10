#!/bin/bash

if [ "$1" == "push" ]; then
	echo "found new changes in main repo, commit and push"
	git add -A
	msg="update at $(date '+%Y-%m-%d %H:%M:%S')"
	git commit -m "${1:-$msg}"
	git push
	exit 0
fi

updated="no"

git fetch
HEADHASH=$(git rev-parse HEAD)
UPSTREAMHASH=$(git rev-parse master@{upstream})

if [ "$HEADHASH" != "$UPSTREAMHASH" ]; then
	echo "updating..."
	git pull
	updated="yes"
fi

if [ "$updated" == "yes" ]; then
	echo "updated"
	exit 1
else
	exit 0
fi
