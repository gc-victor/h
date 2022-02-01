require('esbuild').buildSync({
    entryPoints: ['examples/jsx/app.jsx'],
    inject: ['examples/jsx/h-shim.js'],
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    bundle: true,
    outfile: 'examples/app-jsx.js',
});
