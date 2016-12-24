
publish:
	npm publish

publish-sync: publish
	cnpm sync roadhog
	tnpm sync roadhog
