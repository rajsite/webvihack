// Pattern from roll-up https://github.com/rollup/rollup-plugin-commonjs/blob/v8.3.0/src/helpers.js#L4
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

beforeAll(function () {
    if (typeof commonjsGlobal.XMLHttpRequest === 'undefined') {
        // The node.js environment
        require('../../src/setupGlobalNodeEnvironment.js');
        commonjsGlobal.webvipolyfill = require('../../dist/webvipolyfill.concat.js');
        commonjsGlobal.Vireo = require('vireo');
        commonjsGlobal.rebootAndLoadVia = require('../support/rebootAndLoadVia.js');
    } else {
        // webvipolyflll should ready be loaded to window.webvipolyfill
        commonjsGlobal.Vireo = window.NationalInstruments.Vireo.Vireo;
        // rebootAndLoadVia should already be loaded to window.rebootAndLoadVia
    }

});
