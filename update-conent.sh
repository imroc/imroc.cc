#!/bin/bash

dirs=(
	kubernetes
	istio
	note
	blog
)

updated=1
for dir in ${dirs[@]}; do
	cd $dir
	git fetch
	HEADHASH=$(git rev-parse HEAD)
	UPSTREAMHASH=$(git rev-parse master@{upstream})
	if [ "$HEADHASH" != "$UPSTREAMHASH" ]; then
		echo "updating..."
		git pull
		updated=0
	fi
	cd -
done

if [ $updated ]; then
	echo "updated"
	exit 0
else
	echo "noting changed"
	exit 1
fi
