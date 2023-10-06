help: ## Show this help message
	@echo 'usage: make [target] <type> <name>'
	@echo
	@echo 'Targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

bundle: ## Create production bundle
	rm -rf dist || exit $? ; \
	node ./esbuild.js || exit $? ; \

cp: ## Copy files
	cp -r index.js examples/h.js || exit $? ; \
	cp -r document.js examples/document.js || exit $? ; \

format: ## Enforces a consistent style by parsing your code and re-printing it
	npx prettier --write "./**/*.js" "./tests/**/*.js" "./examples/**/*.js" ;\

jsx: ## Build JSX example
	node examples/jsx/esbuild-jsx.js || exit $? ;\

ssr: ## Run a static page
	node examples/ssr/counter.js || exit $? ;\

server: ## Run a dev server
	make cp || exit $? ; \
	make ssr || exit $? ; \
	make jsx || exit $? ; \
	pnpm --package=github:gc-victor/d-d dlx d-d || exit $? ; \

test: ## Execute tests
	make test-browser || exit $? ; \
	make test-ssr || exit $? ; \

test-browser: ## Execute tests
	node tests/tests-browser.js || exit $? ;\

test-ssr: ## Execute SSR tests
	node tests/tests-ssr.js || exit $? ;\

test-watch: ## Execute tests on watch mode
	make test-ssr || exit $? ; \
	npx chokidar-cli "**/*.js" -c "make test" || exit $? ;\

# catch anything and do nothing
%:
	@:
