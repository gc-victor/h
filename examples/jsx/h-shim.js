import hh from '../src/index.js';

export default function h(type, props, ...children) {
    if (typeof type === 'function') {
        return type({
            ...(props || {}),
            children: [].concat.apply([], children),
        });
    }

    return hh(type, props || {}, [].concat.apply([], children));
}

function Fragment(props) {
    return props.children;
}

export { Fragment, h };
