import { expect, test as t } from 't-t';

import '../document.js';
import { h, Fragment } from '../index.js';

const test = t;
// const only = t;
// const test = () => {};

test('should remove key attributes', () => {
    const el = h('div', { id: 'app', key: 'test-key' });

    expect(el).toBe('<div id="app"></div>');
});

test('should remove event attributes', () => {
    const el = h('input', {
        type: 'submit',
        onInput: () => {
            const e = 'input';
        },
        onChange: () => {
            const e = 'change';
        },
    });

    expect(el).toBe('<input type="submit">');
});

test('should rename className by class', () => {
    const el = h('p', { className: 'p' });

    expect(el).toBe('<p class="p"></p>');
});

test('should add children text', () => {
    const el = h('p', { className: 'p' }, ['text']);

    expect(el).toBe('<p class="p">text</p>');
});

test('should add children elements', () => {
    const el = h('div', { id: 'app' }, [
        h('p', { className: 'p' }, [
            'text',
            h('input', {
                type: 'submit',
            }),
        ]),
    ]);

    expect(el).toBe('<div id="app"><p class="p">text<input type="submit"></p></div>');
});

test('should create a list of elements', () => {
    const arr = [0, 1, 2];

    const el = h('div', { id: 'app' }, [
        h(
            'ul',
            {},
            arr.map((n) => h('li', {}, [`${n}`]))
        ),
    ]);
    expect(el).toBe('<div id="app"><ul><li>0</li><li>1</li><li>2</li></ul></div>');
});

test('should create a svg element', () => {
    const el = h('svg', { width: 100, height: 100 }, [
        h('circle', {
            cx: 50,
            cy: 50,
            r: 40,
            stroke: 'green',
            'stroke-width': 4,
            fill: 'yellow',
        }),
    ]);

    expect(el).toBe(
        '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"></circle></svg>'
    );
});

test('should append a fragment', () => {
    const fragment = h(
        Fragment,
        {},
        h('h1', {}, ['Counter']),
        h('button', { onClick: () => {} }, ['+']),
        h('input', { onInput: () => {}, name: 'input', type: 'number', value: 0 }),
        h('button', { onClick: () => {} }, ['-'])
    );

    const el = h('div', { id: 'app' }, fragment);

    expect(el).toBe(
        '<div id="app"><h1>Counter</h1><button>+</button><input name="input" type="number" value="0"><button>-</button></div>'
    );
});

test('should append a component', () => {
    const Component = ({ children }) => {
        return h('p', null, ...children);
    };

    const el = h('div', { id: 'app' }, h(Component, null, ['Component']));

    expect(el).toBe('<div id="app"><p>Component</p></div>');
});
