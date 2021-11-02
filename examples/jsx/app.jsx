import h from './h-shim';

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
    return <div id="app">
        <h1>Counter</h1>
        <button onClick={increment}>+</button>
        <input ref={(el) => input = el} onInput={add} name="input" type="number" value={count} />
        <button onClick={decrement}>-</button>
    </div>;
};

const app = document.getElementById('app');
app.parentNode.replaceChild(counter(), app);
