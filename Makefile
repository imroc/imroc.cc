SHELL := /bin/bash

init: install
	git clone --depth=1 https://github.com/imroc/blog.git blog
	git clone --depth=1 git@gitee.com:imroc/imroc.cc.git build

start:
	npm run start

gen:
	npx docusaurus build --out-dir=./imroc.cc/out

install:
	npm install

outdated:
	npm outdated

push:
	cd build && git add -A && git commit -m update && git push

update: install gen push
