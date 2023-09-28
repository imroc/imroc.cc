#!/bin/bash

updated=1

git fetch
HEADHASH=$(git rev-parse HEAD)
UPSTREAMHASH=$(git rev-parse master@{upstream})

if [ "$HEADHASH" != "$UPSTREAMHASH" ]; then
	echo "updating..."
	git pull
	updated=0
fi

if [ $updated ]; then
	echo "updated"
	exit 1
else
	echo "noting changed"
	exit 0
fi
