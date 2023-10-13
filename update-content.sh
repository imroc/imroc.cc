#!/bin/bash

dirs=(
	istio
	note
	blog
)

if [ "$1" == "push" ]; then
	for dir in ${dirs[@]}; do
		cd $dir
		if [[ $(git status --porcelain) ]]; then
			echo "found new changes in $dir, commit and push"
			git add -A
			msg="update at $(date '+%Y-%m-%d %H:%M:%S')"
			git commit -m "${msg}"
			git push
		fi
		cd - &>/dev/null
	done
	exit 0
fi

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
	cd - &>/dev/null
done

if [ "$updated" == "yes" ]; then
	echo "updated"
	exit 1
else
	exit 0
fi
