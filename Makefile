SHELL := /bin/bash

init: install
	git clone --depth=1 https://github.com/imroc/blog.git blog
	git clone --depth=1 https://github.com/imroc/note.git note
	git clone --depth=1 https://github.com/imroc/kubernetes-guide.git kubernetes
	git clone --depth=1 https://github.com/imroc/istio-guide.git istio
	git clone --depth=1 https://gitee.com/imroc/imroc.cc.git build
start:
	npm run start
gen:
	npx docusaurus build --out-dir=./build/out
install:
	npm install
outdated:
	npm outdated
update: install gen
	cd build && git add -A && git commit -m update && git push
