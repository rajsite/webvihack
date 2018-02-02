
import xhookImport from 'xhook';
import WebVIPolyfillRegistry from './WebVIPolyfillRegistry.js';

// The current protocol version
const protocolVersion = 1;

// There are no valid http status codes >=600 so we abuse this range to encode webvipolyfill protocol version
const protocolVersionAsStatusCode = protocolVersion + 600;

// This pattern is defensive because of https://github.com/jpillora/xhook/issues/85
// Should be removed when that is resolved
let xhook;
if (xhookImport.enable === undefined) {
    if (xhookImport.xhook === undefined || xhookImport.xhook.enable === undefined) {
        throw new Error('Unrecognized xhook exports');
    } else {
        xhook = xhookImport.xhook;
    }
} else {
    xhook = xhookImport;
}

// TODO prevent global registrations and control manually
// Synchronously set-up xhook to listen for polyfill network requests

// Intercept HTTP Post requests
// URL to intercept is webvipolyfill:<name>
// where webvipolyfill: is a custom scheme and <name> is a string that corresponds to the defined polyfill

// Example usage:
// Load webvipolyfill.dist.js as the very first script

var webvipolyfill = new WebVIPolyfillRegistry();

// TODO block all hooks on registry loading, works since all requests are async by default
xhook.before(function (request, callback) {
    // Delegate to the native request if not a webvipolyfill request
    if (request.url.indexOf('webvipolyfill:') !== 0) {
        return;
    }

    // Find the name of the polyfill to use
    var matches = /^webvipolyfill:([a-z]\w*)$/.exec(request.url);
    if (matches === null) {
        // TODO make an error response instead
        return;
    }

    var name = matches[1];
    webvipolyfill._getPolyfillAction(name).then(function (action) {
        var result = action(request.body);
        callback({
            status: 200,
            statusText: 'OK',
            data: result
        });
    });
});

// Export in browser and workers
if (typeof window !== 'undefined') {
    window.webvipolyfill = webvipolyfill;
} else if (typeof self !== 'undefined') {
    self.webvipolyfill = webvipolyfill;
}

// Export in node
export default webvipolyfill;
