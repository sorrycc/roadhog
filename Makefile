
build:
	npm run build

publish: build
	npm publish

publish-sync: publish
	cnpm sync roadhog
	tnpm sync roadhog
