import { expect, test as t, window } from 't-t';
import jsdom from 'jsdom';
import { h, Fragment } from '../index.js';

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body><div id="app"><p>Hello world!</p></div></body>`, {
    url: 'https://h.h/',
});
window('window', dom.window);
window('document', dom.window.document);
global.Node = dom.window.Node;

const test = t;
// const only = t;
// const test = () => {};

const useApp = () => {
    const app = document.getElementById('app');
    app.innerHTML = '';
    return app;
};

const replace = (tmpl) => {
    const app = useApp();
    app.parentNode.replaceChild(tmpl, app);
};

test('should add to the __handler__ the event handlers', () => {
    replace(
        h('div', { id: 'app' }, [
            h('input', {
                id: 'test',
                onInput: () => {
                    const e = 'input';
                },
                onChange: () => {
                    const e = 'change';
                },
            }),
        ])
    );
    const handler = document.getElementById('test').__handler__;

    expect(handler.change.toString().replace(/\s{2}/g, '')).toBe("() => { const e = 'change'; }");
    expect(handler.input.toString().replace(/\s{2}/g, '')).toBe("() => { const e = 'input'; }");
});

test('should add to the __key__ the key attribute', () => {
    replace(h('div', { id: 'app' }, [h('p', { id: 'test', key: 'test-key' })]));

    expect(document.getElementById('test').__key__).toBe('test-key');
});

test('should remove event and key attributes', () => {
    replace(
        h('div', { id: 'app' }, [
            h('input', {
                id: 'test',
                key: 'test-key',
                onInput: () => {
                    const e = 'input';
                },
                onChange: () => {
                    const e = 'change';
                },
            }),
        ])
    );
    const el = document.getElementById('test');

    expect(el.getAttribute('key')).toBe(null);
    expect(el.getAttribute('oninput')).toBe(null);
    expect(el.getAttribute('onchange')).toBe(null);
    expect(el.getAttribute('onInput')).toBe(null);
    expect(el.getAttribute('onChange')).toBe(null);
});

test('should create a list of elements', () => {
    const arr = [0, 1, 2];
    replace(
        h('div', { id: 'app' }, [
            h(
                'ul',
                {},
                arr.map((n) => h('li', {}, [`${n}`]))
            ),
        ])
    );

    expect(document.querySelectorAll('li').length).toBe(3);
});

test('should create a svg element with namespaceURI', () => {
    replace(
        h('div', { id: 'app' }, [
            h('svg', { width: 100, height: 100 }, [
                h('circle', {
                    cx: 50,
                    cy: 50,
                    r: 40,
                    stroke: 'green',
                    'stroke-width': 4,
                    fill: 'yellow',
                }),
            ]),
        ])
    );

    const svg = document.querySelector('svg');

    expect(svg.namespaceURI).toBe('http://www.w3.org/2000/svg');
    expect(svg.outerHTML).toBe(
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

    expect(el.textContent).toBe('Counter+-');
    expect(el.outerHTML).toBe(
        '<div id="app"><h1>Counter</h1><button>+</button><input name="input" type="number" value="0"><button>-</button></div>'
    );

    const h1 = el.querySelector('h1');

    expect(h1.textContent).toBe('Counter');
});

test('should append a component', () => {
    const Component = ({ children }) => {
        return h('p', null, ...children);
    };

    const el = h('div', { id: 'app' }, h(Component, null, ['Component']));

    expect(el.outerHTML).toBe('<div id="app"><p>Component</p></div>');

    const p = el.querySelector('p');

    expect(p.textContent).toBe('Component');
});
