build_production:
	@echo Generating base.
	@bundle exec jekyll build

	@echo Inlining critical CSS.
	node ./scripts/inline-critical.js

	@echo Inlining search data into search.html.
	npm run build:inline-search-data

	@echo Transforming images.
	node ./scripts/transform-images.js

	@echo Compressing font files.
	#npm run build:compress-fonts

	# @echo Uglifying resources.
	npm run build:uglify

	npm run build:transform
	cp now.template.json ./_site/now.json

build_development:
	@echo Generating base.
	@bundle exec jekyll build

	@echo Inlining critical CSS.
	node ./scripts/inline-critical.js

	@echo Inlining search data into search.html.
	npm run build:inline-search-data

	npm run build:transform

	cp now.template.json ./_site/now.json

now_dev:
	# python3 -m http.server --directory _site 5000 --bind 127.0.0.1
	now dev --port 5000

deploy: | build_production netlify

netlify:
	npx netlify deploy --dir=_site --open

dev: | build_development now_dev