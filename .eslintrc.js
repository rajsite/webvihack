module.exports = {
    extends: 'eslint:recommended',
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        amd: true
    },
    rules: {
        quotes: ['error', 'single'],
        'eol-last': ['error', 'always']
    },

    // Don't enable all ES6 feautues, only those that are available in LabVIEW NXG or polyfillable
    globals: {
        Uint8Array: true,
        Promise: true,
        Map: true
    }
}
