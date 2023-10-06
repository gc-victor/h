import { writeFile, readFileSync } from 'fs';
import { join as joinPath } from 'path';

import '../document.js';
import h, { Fragment } from '../h.js';

const content = h(Fragment, {}, [
    h('h1', {}, ['Counter SSR']),
    h('form', {}, [
        h('button', { type: 'button', onClick: () => {} }, ['+']),
        h('input', { onInput: () => {}, name: 'input', type: 'number', value: 0 }),
        h('button', { type: 'button', onClick: () => {} }, ['-']),
    ]),
]);

const counter = h('div', { id: 'app' }, content);

const template = readFileSync(`${joinPath('./examples/ssr/template.html')}`).toString();
writeFile('examples/index.html', template.replace('__CONTENT__', counter), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
