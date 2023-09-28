#!/bin/bash

dirs=(
	kubernetes
	istio
	note
	blog
)

updated="no"
for dir in ${dirs[@]}; do
	cd $dir
	git fetch
	HEADHASH=$(git rev-parse HEAD)
	UPSTREAMHASH=$(git rev-parse master@{upstream})
	if [ "$HEADHASH" != "$UPSTREAMHASH" ]; then
		echo "updating..."
		git pull
		updated="yes"
	fi
	cd -
done

if [ "$updated" == "yes" ]; then
	echo "updated"
	exit 1
else
	echo "noting changed"
	exit 0
fi
