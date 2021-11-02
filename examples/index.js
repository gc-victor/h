import h from './src/index.js';

let count = 0;
let input;

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

const counter = () => {
    return h('div', { id: 'app' }, [
        h('h1', null, ['Counter']),
        h('button', { onClick: increment }, ['+']),
        h('input', { ref: (el) => input = el, onInput: add, name: 'input', type: 'number', value: count }),
        h('button', { onClick: decrement }, ['-']),
    ]);
};

const app = document.getElementById('app');
app.parentNode.replaceChild(counter(), app);
