import {readAsText} from 'promise-file-reader';
import {xhook} from 'xhook';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var scheme = 'webvipolyfill';
var protocol = scheme + ':';
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
        // TODO return an error instead
        callback();
        return;
    }

    Promise.resolve(polyfillAction).then(function (polyfillAction) {
        requestDataAsString(request.body).then(function(body) {
            var result = polyfillAction(body);
            var resultArrayBuffer = encoder.encode(result);
            callback({
                status: 200,
                statusText: 'OK',
                data: resultArrayBuffer
            });
        });
    });
});
