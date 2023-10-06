import h from './h.js';

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
    return h('form', { onSubmit: (ev) => ev.preventDefault() }, [
        h('button', { type: 'button', onClick: increment }, ['+']),
        h('input', {
            ref: (el) => (input = el),
            onInput: add,
            name: 'input',
            type: 'number',
            value: count,
        }),
        h('button', { type: 'button', onClick: decrement }, [h('span', {}, ['-'])]),
    ]);
};

const form = document.querySelector('form');
form.parentNode.replaceChild(counter(), form);
