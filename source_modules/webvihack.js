import {readAsText} from 'promise-file-reader';
import {xhook} from 'xhook';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var scheme = 'webvihack';
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
    // Delegate to the native request if targetting any other protocol
    if (request.url.indexOf(protocol) !== 0) {
        callback();
        return;
    }

    // Verify that a POST method was used or error

    // Find the name of the JavaScript function in global scope to use
    var name = request.url.substring(protocol.length);
    var action = commonjsGlobal[name];
    if (typeof action !== 'function') {
        callback({
            status: 44302
        });
        return;
    }

    requestDataAsString(request.body).then(function(body) {
        var result;
        try {
            result = action(body);
        } catch (ex) {
            callback({
                status: 44300
            });
            console.log(ex); // eslint-disable-line no-console
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
