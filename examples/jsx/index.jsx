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

const Title = ({ children }) => (
    <h1>{children}</h1>
);

const Content = () => (
    <>
        <Title>Counter JSX</Title>
        <button onClick={increment}>+</button>
        <input ref={(el) => (input = el)} onInput={add} name="input" type="number" value={count} />
        <button onClick={decrement}>-</button>
    </>
);

const counter = () => {
    return <div id="app"><Content /></div>;
};

const app = document.getElementById('app');
app.parentNode.replaceChild(counter(), app);
