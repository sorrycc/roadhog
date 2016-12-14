
publish:
	npm publish

publish-sync: publish
	cnpm sync loadhog
	tnpm sync loadhog
