import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default [{
    input: 'source_modules/webvipolyfill_version.js',
    output: {
        file: 'source_intermediate/webvipolyfill_version.js',
        format: 'umd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
}, {
    input: 'source_modules/webvipolyfill.js',
    output: {
        file: 'webvipolyfill_resources/webvipolyfill.js',
        format: 'umd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
}];
