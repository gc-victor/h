import hh from '../src/index.js';

export default function h(type, props, children) {
    return hh(type, props, arguments.length > 3 ? [].slice.call(arguments, 2) : children);
}
