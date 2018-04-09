import {version} from '../package.json';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// Export the version number of the package
// JavaScript functions may use this version to validate synchronization between JS and the WebVI
var majorVersion = parseInt(version, 10);
commonjsGlobal.webvihack_version = majorVersion;
commonjsGlobal.webvihack_version_error_code = 10001;
