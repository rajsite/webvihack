import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'source/webvipolyfill.js',
    output: {
        file: 'webvipolyfill_resources/webvipolyfill.js',
        format: 'umd',
        name: 'webvipolyfill'
    },
    plugins: [
        resolve(),
        commonjs()
    ]
};
