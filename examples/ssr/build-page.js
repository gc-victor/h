import 'html-element/global-shim';
import { promises as fsp, readFileSync } from 'fs';
import { join as joinPath } from 'path';

// @see: https://github.com/jakearchibald/jakearchibald.com/blob/master/static-build/utils.tsx#L27
export async function buildPage({ content, output }) {
    const pathParts = ['./', output];
    const fullPath = joinPath(...pathParts);
    const templ = readFileSync(`${joinPath('./examples/templ.html')}`).toString();

    try {
        await fsp
            .writeFile(
                fullPath,
                '<!DOCTYPE html>' + templ.replace('__CONTENT__', content),
                {
                    encoding: 'utf8',
                }
            )
            .catch();

        return fullPath;
    } catch (err) {
        console.error('Failed to write ' + fullPath);
        throw err;
    }
}
