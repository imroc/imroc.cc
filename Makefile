init:
	git clone --depth=1 https://github.com/imroc/kubernetes-guide.git kubernetes
	git clone --depth=1 https://github.com/imroc/istio-guide.git istio
run:
	npm run start
build:
	npm run build
install:
	npm install
update: install build
	npx docusaurus --version
