globalThis.document = {
    createElement(tagName) {
        return {
            tagName,
            attributes: {},
            children: [],
            setAttribute(name, value) {
                this.attributes[name] = value;
            },
            appendChild(child) {
                this.children.push(child);
            },
            get innerHTML() {
                return this.children.reduce((prev, child) => prev + child.textContent, '');
            },
            get outerHTML() {
                const shelfClosingTags = [
                    'area',
                    'base',
                    'br',
                    'col',
                    'embed',
                    'hr',
                    'img',
                    'input',
                    'link',
                    'meta',
                    'param',
                    'source',
                    'track',
                    'wbr',
                ];
                const attributes = Object.keys(this.attributes)
                    .map((name) => `${name}="${this.attributes[name]}"`)
                    .join(' ');

                const tagName2 = this.tagName?.toLowerCase() || 'div';
                const innerHTML = this.innerHTML;
                return `<${tagName2}${attributes ? ` ${attributes}` : ''}>${innerHTML}${
                    shelfClosingTags.includes(tagName2) ? '' : `</${tagName2}>`
                }`;
            },
        };
    },
    createTextNode(text) {
        return {
            textContent: text,
        };
    },
    createElementNS(namespaceURI, tagName) {
        return this.createElement(tagName);
    },
};
