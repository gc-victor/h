import { execSync } from 'child_process';

export default {
    dist: '/examples',
    src: ['./src', './examples/jsx'],
    port: 1234,
    socketPort: 1235,
    onChangeServer: () => {
        const cmd = 'node examples/jsx/esbuild-jsx.js';
        console.log('Execute:', cmd, '\n');
        execSync(cmd);
    },
};
