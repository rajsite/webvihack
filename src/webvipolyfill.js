
import xhookImport from 'xhook';
import WebVIPolyfillRegistry from './WebVIPolyfillRegistry.js';

// The current protocol version
const protocolVersion = 1;

// There are no valid http status codes >=600 so we abuse this range to encode webvipolyfill protocol version
const protocolVersionAsStatusCode = protocolVersion + 600;

// Just in-case, should update when this is resolved https://github.com/jpillora/xhook/issues/85
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

// Synchronously set-up xhook to listen for polyfill network requests

// Intercept HTTP Post requests
// URL to intercept is webvipolyfill:<name>
// where webvipolyfill: is a custom scheme and <name> is a string that corresponds to the defined polyfill

// Example usage:
// Load webvipolyfill.dist.js as the very first script



export default {
    WebVIPolyfillRegistry
}
