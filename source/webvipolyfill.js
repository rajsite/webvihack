import {readAsText} from 'promise-file-reader';
import {xhook} from 'xhook';
import {version} from '../package.json';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var scheme = 'webvipolyfill';
var protocol = scheme + ':';

// Export the version number of the webvipolyfill package
// Polyfills may use this version to validate synchronization between JS and the WebVI
var majorVersion = parseInt(version, 10);
commonjsGlobal.webvipolyfill_version = majorVersion;
commonjsGlobal.webvipolyfill_version_error_code = 10001;

var encoder = new TextEncoder();
var decoder = new TextDecoder();

var requestDataAsString = function (data) {
    // node environment uses UInt8Array while browser uses Blob
    if (data instanceof Uint8Array) {
        return Promise.resolve(decoder.decode(data));
    } else {
        return readAsText(data);
    }
};

// TODO block all hooks on registry loading, works since all requests are async by default
xhook.before(function (request, callback) {
    // Delegate to the native request if not a webvipolyfill request
    if (request.url.indexOf(protocol) !== 0) {
        callback();
        return;
    }

    // Verify that a POST method was used or error

    // Find the name of the polyfill to use
    var name = request.url.substring(protocol.length);
    var polyfillAction = commonjsGlobal[name];
    if (typeof polyfillAction !== 'function') {
        callback({
            status: 44302
        });
        return;
    }

    requestDataAsString(request.body).then(function(body) {
        var result;
        try {
            result = polyfillAction(body);
        } catch (ex) {
            callback({
                status: 44300
            });
            return;
        }

        if (result === undefined) {
            result = '';
        }

        if (typeof result !== 'string') {
            callback({
                status: 44304
            });
            return;
        }

        // As long as result is a string it seems like this doesn't error
        var resultArrayBuffer = encoder.encode(result);
        callback({
            status: 200,
            statusText: 'OK',
            data: resultArrayBuffer
        });
    });
});
