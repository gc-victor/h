import * as esbuild from 'esbuild';

await esbuild.buildSync({
    entryPoints: ['examples/jsx/index.jsx'],
    inject: ['examples/jsx/h-shim.js'],
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    bundle: true,
    outfile: 'examples/index-jsx.js',
});
