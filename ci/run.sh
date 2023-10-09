#!/bin/bash

website_path="/data/website"
repo="https://github.com/imroc/imroc.cc.git"

if [ -d $website_path ]; then
	if [ -z "$(ls -A $website_path)" ]; then
		echo "$website_path is empty, start init..."
		git clone --depth=1 $repo $website_path
		cd $website_path
		while true; do
			make init
			if [ "$?" != "0" ]; then
				echo "init failed, retry..."
				sleep 10
			else
				break
			fi
		done
		cd - &>/dev/null
	else
		echo "$website_path is not empty, skip initialization"
		cd $website_path
		git reset --hard HEAD &>/dev/null
		git pull
		cd - &>/dev/null
	fi
else
	echo "$website_path not exist"
	exit 1
fi

cd $website_path

while true; do
	sleep 10
	./update-content.sh
	content_updated="$?"
	git reset --hard HEAD &>/dev/null
	./update.sh
	website_updated="$?"
	if [ "$website_updated" == "1" ]; then
		npm install
	fi
	if [ "$website_updated" == "1" ] || [ "$content_updated" == "1" ]; then
		make update
	fi
done
