require('esbuild').buildSync({
    entryPoints: ['examples/jsx/app.jsx'],
    inject: ['examples/jsx/h-shim.js'],
    jsxFactory: 'h',
    bundle: true,
    outfile: 'examples/jsx/app-jsx.js',
});
