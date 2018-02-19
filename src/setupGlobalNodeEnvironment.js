(function () {
    // Pattern from roll-up https://github.com/rollup/rollup-plugin-commonjs/blob/v8.3.0/src/helpers.js#L4
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    // Returns a constructor functon named Blob intended to hack around the lack of a Blob API in node.js
    var Blob = function (config) {
        if (Array.isArray(config) === false || config[0] instanceof Uint8Array === false) {
            throw new Error('BlobHackPassthrough should only be used to intercept simple TypedArray Blob requests');
        }
        return config[0];
    };

    // Detect if in the node environment and setup needed DOM apis
    if (typeof commonjsGlobal.XMLHttpRequest === 'undefined') {
        commonjsGlobal.XMLHttpRequest = require('xhr2');
        commonjsGlobal.Blob = Blob;
        commonjsGlobal.TextEncoder = require('util').TextEncoder;
        commonjsGlobal.TextDecoder = require('util').TextDecoder;
    }

}());
