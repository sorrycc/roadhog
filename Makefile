
build:
	npm run build

publish: build
	npm publish

sync:
	cnpm sync roadhog
	tnpm sync roadhog
