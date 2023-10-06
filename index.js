// @see: https://github.com/preactjs/preact/blob/87202bd7dbcb5b94506f9388516a9c4bd289129a/compat/src/render.js#L149
const CAMEL_PROPS =
    /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
const events = {};

function hh(type, props = {}, children = []) {
    const hasWindow = typeof window !== 'undefined';
    const element =
        type === 'svg'
            ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            : document.createElement(type);
    const keys = Object.keys(props || {});
    const length = keys.length;
    const childrenLength = children.length;
    for (let i = 0; i < childrenLength; i++) {
        const c = children[i];
        if (c && type === 'svg' && hasWindow) {
            element.innerHTML = `${element.innerHTML}${c.outerHTML}`;
        } else if (c) {
            element.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
        }
    }
    for (let i = 0; i < length; i++) {
        const key = keys[i];
        if (key && /^on/.test(key) && hasWindow) {
            const eventType = key.toLowerCase().substring(2);
            element.__handler__ = element.__handler__ || {};
            element.__handler__[eventType] = props[key];
            !events[eventType] && document.addEventListener(eventType, handler);
            events[eventType] = 1;
        }
        if (key && !/^key$/.test(key) && !/^on/.test(key) && !/^ref$/.test(key)) {
            const classProp = key === 'className' ? 'class' : '';
            const forProp = key === 'htmlFor' ? 'for' : '';
            const hyphenated =
                CAMEL_PROPS.test(key) && key.replace(/[A-Z0-9]/, '-$&').toLowerCase();
            if (key !== 'checked' || (key === 'checked' && props[key])) {
                element.setAttribute(forProp || classProp || hyphenated || key, props[key]);
            }
        }
        if (key && /^key$/.test(key)) {
            element.__key__ = props[key];
        }
        if (key && /^ref$/.test(key)) {
            props[key](element);
        }
    }
    return element;
}

const handler = (ev) => {
    let el = ev.target;
    const type = ev.type;
    while (el !== null) {
        const handler = el.__handler__ && el.__handler__[type];
        if (handler) {
            handler(ev);
            return;
        }
        el = el.parentNode;
    }
};

export function Fragment(props) {
    return props.children;
}

export function h(type, props, ...children) {
    const isBrowser = typeof window !== 'undefined';
    if (typeof type === 'function') {
        return type({
            ...(props || {}),
            children: !isBrowser
                ? [
                      children
                          .map((c) => {
                              if (Object.prototype.toString.call(c) === '[object Array]') {
                                  return c
                                      .map((c) => (typeof c === 'string' ? c : c.outerHTML))
                                      .join('');
                              }

                              return c.outerHTML || c;
                          })
                          .join(''),
                  ]
                : children,
        });
    }

    const element = hh(type, props || {}, [].concat.apply([], children));

    return isBrowser ? element : element.outerHTML;
}

export default h;
