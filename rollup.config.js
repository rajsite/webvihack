import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
    input: 'source/webvipolyfill.js',
    output: {
        file: 'webvipolyfill_resources/webvipolyfill.js',
        format: 'umd',
        name: 'webvipolyfill'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
};
