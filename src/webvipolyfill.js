
import polyfillNameSyntax from './polyfillNameSyntax.js';
import {readAsText} from 'promise-file-reader';
import {xhook} from 'xhook';
import WebVIPolyfillRegistry from './WebVIPolyfillRegistry.js';

// The webvipolyfill url scheme
var scheme = 'webvipolyfill';
var protocol = scheme + ':';

var webvipolyfillRegistry = new WebVIPolyfillRegistry();
var encoder = new TextEncoder();

// TODO block all hooks on registry loading, works since all requests are async by default
xhook.before(function (request, callback) {
    // Delegate to the native request if not a webvipolyfill request
    if (request.url.indexOf(protocol) !== 0) {
        callback();
        return;
    }

    // Verify that a POST method was used or error

    // Find the name of the polyfill to use
    var possibleName = request.url.substring(protocol.length);
    var matches = polyfillNameSyntax.exec(possibleName);
    if (matches === null) {
        // TODO make an error response instead
        callback();
        return;
    }

    var name = matches[1];
    webvipolyfillRegistry._getPolyfillActionPromise(name).then(function (polyfillAction) {
        readAsText(request.body).then(function(body) {
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

// Export in browser and workers
if (typeof window !== 'undefined') {
    window.webvipolyfill = webvipolyfillRegistry;
} else if (typeof self !== 'undefined') {
    self.webvipolyfill = webvipolyfillRegistry;
}

// Export in node
export default webvipolyfillRegistry;
