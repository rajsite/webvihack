import {version} from '../package.json';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// Export the version number of the webvipolyfill package
// Polyfills may use this version to validate synchronization between JS and the WebVI
var majorVersion = parseInt(version, 10);
commonjsGlobal.webvipolyfill_version = majorVersion;
commonjsGlobal.webvipolyfill_version_error_code = 10001;
