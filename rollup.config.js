import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'js/webvipolyfill.main.js',
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
