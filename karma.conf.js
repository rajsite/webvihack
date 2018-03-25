(function () {
    'use strict';

    process.env.CHROME_BIN = require('puppeteer').executablePath()

    module.exports = function (config) {
        config.set({
            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '.',

            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                // 3rd party resources
                'node_modules/vireo/dist/asmjs-unknown-emscripten/release/vireo.js',
                'node_modules/vireo/source/core/module_coreHelpers.js',
                'node_modules/vireo/source/io/module_*.js',
                'node_modules/vireo/source/core/vireo.loader.js',

                // support files
                'spec/support/*.js',

                // test assets
                {
                    pattern: 'Builds/**/*.via.txt',
                    included: false
                },
                'webvipolyfill_resources/*.js',
                'spec/helpers/*.js',

                // test specs
                'spec/**/*spec.js'
            ],

            // list of files to exclude
            exclude: [
            ],

            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {},

            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['dots'],

            // web server port
            port: 9876,

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: [],

            // custom browser configurations
            customLaunchers: {
                ChromeHeadlessNoSandbox: {
                    base: 'ChromeHeadless',
                    flags: ['--no-sandbox']
                }
            },

            // Hostname to be used when capturing browsers.
            // This seems to reduce intermittent hangs on Windows 7 using IE 11
            hostname: '127.0.0.1',

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: true,

            // How long will Karma wait for a message from a browser before disconnecting from it (in ms).
            // default: 10000
            browserNoActivityTimeout: 60000,

            // Enable or disable failure on running empty test-suites. If disabled the program will return exit-code 0 and display a warning.
            failOnEmptyTestSuite: true,

            // Concurrency level
            // how many browser should be started simultaneous
            concurrency: 1
        });
    };
}());
