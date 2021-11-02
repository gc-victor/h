# H

H is a micro-library (800 B) to create DOM Trees using HyperScript template.

## Key Features

- Micro-library 800 B
- No compilation needed
- Real DOM Tree
- SSR out of the box
- Only one dependency for SSR
- Small API, not much to learn

## Let's Play

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script type="module">
            import h from 'https://cdn.jsdelivr.net/gh/gc-victor/h/dist/esm/index.js';

            let input;
            let count = 0;

            const increment = () => {
                count = count + 1;
                input.value = count;
            };
            const decrement = () => {
                count = count - 1;
                input.value = count;
            };
            const add = (ev) => {
                count = Number(ev.target.value);
            };

            const component = () => {
                return h('div', { id: 'app' }, [
                    h('h1', {}, ['Counter']),
                    h('button', { onClick: increment }, ['+']),
                    h('input', { ref: (el) => input = el, onInput: add, name: 'input', type: 'number', value: count }),
                    h('button', { onClick: decrement }, ['-'])
                ]);
            };

            const app = document.getElementById('app');
            app.parentNode.replaceChild(counter(), app);
        </script>
    </head>
    <body>
        <div id="app">
            <h1>Counter</h1>
            <button>+</button>
            <input name="input" type="number" value="0">
            <button>-</button>
        </div>
    </body>
</html>
```

## Install

You can use pnpm, npm or yarn to install it.

```console
npm install git+https://github.com/gc-victor/h.git#main
```

Import it in your framework.

```js
import h from 'h';
```

Or import it in a `<script>` as a module.

```html
<script type="module">
    import h from 'https://cdn.jsdelivr.net/gh/gc-victor/h/dist/esm/index.js';
</script>
```

## How to use it

It doesn't require bundlers or compilers.

```javascript
h('h1', {}, ['H']);
```

Uses camel case for events

```javascript
h('input', { name: 'input', onInput: () => {} });
```

Uses className instead of class 

```javascript
h('p', { className: 'paragraph' }, ['Paragraph']);
```

Uses htmlFor instead or for

```javascript
h('input', { name: 'input', id: '---' });
h('label', { htmlFor: '---' }, ['Input']);
```

Uses ref to get an element

```javascript
h('input', { ref: (el) => input = el,  name: 'input', onInput: () => {} });
```

Multiple templates can be inherited

```javascript
h('p', {}, [h('span', {}, [])]);
```

### JSX

To transpile JSX you can use [esbuild](https://esbuild.github.io/content-types/#using-jsx-without-react) or [Babel plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) to convert it to JavaScript.

```javascript
import h from 'h';

const App = () =>
    <div id="app">
        <h1>Counter</h1>
        <button onClick={increment}>+</button>
        <input ref={(el) => input = el} onInput={add} name="input" type="number" value={count} />
        <button onClick={decrement}>-</button>
    </div>;
```

### Dependencies

The only dependency is [html-element](https://github.com/1N50MN14/html-element) for Server Side Rendering or Static Site Generation.

```console
npm install html-element
```

```javascript
import 'html-element/global-shim';

// Your code ...
```

## Acknowledgments

### Inspiration

-   [HyperScript](https://github.com/hyperhype/hyperscript)
-   [HyperApp](https://github.com/jorgebucaran/hyperapp)
-   [t](https://github.com/gc-victor/t)

### Tools

-   [esbuild](https://esbuild.github.io/)
-   [gzip-size](https://esbuild.github.io/)
-   [d-d](https://github.com/gc-victor/d-d)
-   [esm](https://github.com/standard-things/esm)
-   [es-module-shims](https://github.com/guybedford/es-module-shims)
-   [jsdom](https://github.com/jsdom/jsdom)
-   [t-t](https://github.com/gc-victor/t-t)
-   [chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)

## Compatible Versioning

### Summary

Given a version number MAJOR.MINOR, increment the:

- MAJOR version when you make backwards-incompatible updates of any kind
- MINOR version when you make 100% backwards-compatible updates

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR format.

[![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

### Reporting Issues

Found a problem? Want a new feature? First of all, see if your issue or idea has [already been reported](../../issues).
If it hasn't, just open a [new clear and descriptive issue](../../issues/new).

### Commit message conventions

A specification for adding human and machine readable meaning to commit messages.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope and do avoid unrelated commits.

-   Fork it!
-   Clone your fork: `git clone http://github.com/<your-username>/h`
-   Navigate to the newly cloned directory: `cd h`
-   Create a new branch for the new feature: `git checkout -b my-new-feature`
-   Install the tools necessary for development: `npm install`
-   Make your changes.
-   `npm run build` to verify your change doesn't increase output size.
-   `npm test` to make sure your change doesn't break anything.
-   Commit your changes: `git commit -am 'Add some feature'`
-   Push to the branch: `git push origin my-new-feature`
-   Submit a pull request with full remarks documenting your changes.

## License

[MIT License](https://github.com/gc-victor/h/blob/master/LICENSE)

Copyright (c) 2021 Víctor García

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
