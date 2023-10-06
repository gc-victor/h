import * as esbuild from 'esbuild';
import { gzipSizeFromFileSync } from 'gzip-size';

[
    {
        format: 'esm',
        outdir: 'dist/esm'
    },
    {

        format: 'cjs',
        outdir: 'dist/cjs',
    },
    {
        format: 'iife',
        keepNames: true,
        outdir: 'dist/iife',
    },
].forEach((config) => {
    const result = esbuild.buildSync({
        bundle: true,
        entryNames: '[dir]/[name]',
        entryPoints: ['index.js'],
        metafile: true,
        minify: true,
        ...config,
    });

    let total = 0;
    let totalGzip = 0;

    Object.keys(result.metafile.outputs).forEach((key) => {
        total = total + result.metafile.outputs[key].bytes;
        totalGzip = totalGzip + gzipSizeFromFileSync(key);

        console.log(
            key,
            formatBytes(result.metafile.outputs[key].bytes),
            '- gzip:',
            formatBytes(gzipSizeFromFileSync(key))
        );
    });

    console.log('Total:', formatBytes(total), '- gzip:', formatBytes(totalGzip), '\n');
});

// https://stackoverflow.com/a/18650828
function formatBytes(a, b = 2) {
    if (0 === a) return '0 Bytes';
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + ' ' + ['B', 'KB', 'MB', 'GB'][d];
}
