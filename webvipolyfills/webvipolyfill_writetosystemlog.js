// A polyfill for the Write to System Log VI
// spec http://zone.ni.com/reference/en-XX/help/371361P-01/glang/write_to_system_log/
// Logs output using the console api
// severity 0 -> console.log (the default log for web developers. console.error outputs a JS stack trace in browsers which isn't that meaningful for WebVIs. to get stack traces WebVI users would use call chain manually)
// severity 1 -> console.warn
// severity 2 -> console.info (modern browsers, ie chrome, filter info messages by default)

(function () {
    'use strict';
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var webvipolyfill_writetosystemlog = function (input) {
        // eslint-disable-next-line no-console
        console.log(input);
    };

    commonjsGlobal.webvipolyfill_writetosystemlog = webvipolyfill_writetosystemlog;
}());
