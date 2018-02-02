// A polyfill for the Write to System Log VI
// spec http://zone.ni.com/reference/en-XX/help/371361P-01/glang/write_to_system_log/
// Logs output using the console api
// severity 0 -> console.log (the default log for web developers. console.error outputs a JS stack trace in browsers which isn't that meaningful for WebVIs. to get stack traces WebVI users would use call chain manually)
// severity 1 -> console.warn
// severity 2 -> console.info (modern browsers, ie chrome, filter info messages by default)

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['webvipolyfill'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('webvipolyfill'));
    } else {
        root.returnExports = factory(root.webvipolyfill);
    }
}(typeof self !== 'undefined' ? self : this, function (webvipolyfill) {

    var writetosystemlog = function (input) {
        console.log(input);
    };

    webvipolyfill.define({
        name: 'writetosystemlog',
        action: writetosystemlog
    });

    return {};
}));
