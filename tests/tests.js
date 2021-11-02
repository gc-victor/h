import { expect, test as t, window } from 't-t';
import jsdom from 'jsdom';
import h from '../src/index';

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
