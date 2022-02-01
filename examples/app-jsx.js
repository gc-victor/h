(() => {
  // src/is-nodejs.js
  var is = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
  if (!is) {
    window.process = { env: { TEST: false } };
  }
  var isNodejs = process.env.TEST ? false : is;

  // src/index.js
  var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var events = {};
  function h2(type, props = {}, children = []) {
    const element = type === "svg" && !isNodejs ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : document.createElement(type);
    const keys = Object.keys(props || {});
    const length = keys.length;
    const childrenLength = children.length;
    for (let i = 0; i < childrenLength; i++) {
      const c = children[i];
      if (c && type === "svg") {
        element.innerHTML = `${element.innerHTML}${c.outerHTML}`;
      } else {
        c && element.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      }
    }
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      if (key && !/^key$|^on|^ref$|^$/.test(key)) {
        if (key !== "checked" || key === "checked" && props[key]) {
          element.setAttribute(key === "htmlFor" ? "for" : key === "className" ? "class" : CAMEL_PROPS.test(key) && key.replace(/[A-Z0-9]/, "-$&").toLowerCase() || key, props[key]);
        }
      }
      if (key && /^on/.test(key)) {
        const eventType = key.toLowerCase().substring(2);
        element.__handler__ = element.__handler__ || {};
        element.__handler__[eventType] = props[key];
        !events[eventType] && document.addEventListener(eventType, handler);
        events[eventType] = 1;
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
  var handler = (ev) => {
    let el = ev.target;
    const type = ev.type;
    while (el !== null) {
      const handler2 = el.__handler__ && el.__handler__[type];
      if (handler2) {
        handler2(ev);
        return;
      }
      el = el.parentNode;
    }
  };
  var src_default = h2;

  // examples/jsx/h-shim.js
  function h(type, props, ...children) {
    if (typeof type === "function") {
      return type({
        ...props || {},
        children: [].concat.apply([], children)
      });
    }
    return src_default(type, props || {}, [].concat.apply([], children));
  }
  function Fragment(props) {
    return props.children;
  }

  // examples/jsx/app.jsx
  var count = 0;
  var input;
  var increment = () => {
    count = count + 1;
    input.value = count;
  };
  var decrement = () => {
    count = count - 1;
    input.value = count;
  };
  var add = (ev) => {
    count = Number(ev.target.value);
  };
  var content = () => /* @__PURE__ */ h(Fragment, null, /* @__PURE__ */ h("h1", null, "Counter"), /* @__PURE__ */ h("button", {
    onClick: increment
  }, "+"), /* @__PURE__ */ h("input", {
    ref: (el) => input = el,
    onInput: add,
    name: "input",
    type: "number",
    value: count
  }), /* @__PURE__ */ h("button", {
    onClick: decrement
  }, "-"), /* @__PURE__ */ h("ul", null, ["0", "1"].map((i) => /* @__PURE__ */ h("li", null, i))));
  var counter = () => {
    return /* @__PURE__ */ h("div", {
      id: "app"
    }, content());
  };
  var app = document.getElementById("app");
  app.parentNode.replaceChild(counter(), app);
})();
