import { buildPage } from './build-page';
import h from '../src';

const counter = h('div', { id: 'app' }, [
    h('h1', {}, ['Counter']),
    h('button', { onClick: () => {} }, ['+']),
    h('input', { onInput: () => {}, name: 'input', type: 'number', value: 0 }),
    h('button', { onClick: () => {} }, ['-']),
]);

buildPage({
    content: counter.outerHTML,
    output: 'examples/counter.html',
})
    .then((fullPath) => console.log('Success: ' + fullPath + '\n'))
    .then(() => process.exit())
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
