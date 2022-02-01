import h from './src/index.js';

let count = 0;
let input;

const increment = () => {
    count = count + 1;
    input.value = count;
};
const decrement = () => {
    count = count - 1;
    // input.value = count;
    const app = document.getElementById('app');
    app.parentNode.replaceChild(counter(), app);
};
const add = (ev) => {
    count = Number(ev.target.value);
};

const counter = () => {
    return h('div', { id: 'app' }, [
        h('h1', null, ['Counter']),
        h('button', { onClick: increment }, ['+']),
        h('input', {
            ref: (el) => (input = el),
            onInput: add,
            name: 'input',
            type: 'number',
            value: count,
        }),
        ...['0', '1'].map((i) => h('span', {}, i)),
        h('button', { onClick: decrement }, [h('span', {}, ['-'])]),
    ]);
};

const app = document.getElementById('app');
app.parentNode.replaceChild(counter(), app);
