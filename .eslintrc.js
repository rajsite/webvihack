module.exports = {
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        amd: true,
        es6: true
    },
    rules: {
        quotes: ['error', 'single'],
        'eol-last': ['error', 'always']
    }
}
