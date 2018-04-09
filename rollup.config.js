import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default [{
    input: 'source_modules/webvihack_version.js',
    output: {
        file: 'source_intermediate/webvihack_version.js',
        format: 'umd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
}, {
    input: 'source_modules/webvihack.js',
    output: {
        file: 'webvihack_resources/webvihack.js',
        format: 'umd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
}];
