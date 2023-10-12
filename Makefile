SHELL := /bin/bash

push:
	./update-content.sh push
	./update.sh push

init: install
	git clone --depth=1 https://github.com/imroc/blog.git blog
	git clone --depth=1 https://github.com/imroc/note.git note
	git clone --depth=1 https://github.com/imroc/kubernetes-guide.git kubernetes
	git clone --depth=1 https://github.com/imroc/istio-guide.git istio
	git clone --depth=1 git@gitee.com:imroc/imroc.cc.git imroc.cc
start:
	npm run start
gen:
	NODE_OPTIONS="--max-old-space-size=30720" npx docusaurus build --out-dir=./imroc.cc/out
install:
	npm install
outdated:
	npm outdated
update: gen
	cd imroc.cc && git add -A && git commit -m update && git push
