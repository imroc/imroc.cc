#!/bin/bash

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
