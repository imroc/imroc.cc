SHELL := /bin/bash

init:
	git clone --depth=1 https://github.com/imroc/kubernetes-guide.git kubernetes
	git clone --depth=1 https://github.com/imroc/istio-guide.git istio
	git clone --depth=1 https://gitee.com/imroc/imroc.cc.git build
run:
	npm run start
build:
	npm run build
install:
	npm install
update: install build
	npx docusaurus --version
