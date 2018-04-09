// A hack for the Write to System Log VI
// based on http://zone.ni.com/reference/en-XX/help/371361P-01/glang/write_to_system_log/
// Logs output using the console api
// severity 0 -> console.log (the default log for web developers. console.error outputs a JS stack trace in browsers which isn't that meaningful for WebVIs. to get stack traces WebVI users would use call chain manually)
// severity 1 -> console.warn
// severity 2 -> console.info (modern browsers, ie chrome, filter info messages by default)

(function () {
    'use strict';
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var webvihack_writetosystemlog = function (inputJSON) {
        var input = JSON.parse(inputJSON);

        if (input.webvihack_version !== commonjsGlobal.webvihack_version) {
            return String(commonjsGlobal.webvihack_version_error_code);
        }

        if (input.severity === 1) {
            console.warn(input.message); // eslint-disable-line no-console
        } else if (input.severity === 2) {
            console.info(input.message); // eslint-disable-line no-console
        } else {
            console.log(input.message); // eslint-disable-line no-console
        }

        return String(0);
    };

    commonjsGlobal.webvihack_writetosystemlog = webvihack_writetosystemlog;
}());
