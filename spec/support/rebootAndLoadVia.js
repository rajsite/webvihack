(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.rebootAndLoadVia = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
    // Adapted from: https://github.com/ni/VireoSDK/blob/v6.1.4/test-it/karma/utilities/TestHelpers.VireoRunner.js
    var rebootAndLoadVia = function (vireo, viaText) {
        expect(typeof viaText).toBe('string');
        expect(viaText).not.toBe('');

        vireo.eggShell.reboot();

        var rawPrint = '';
        vireo.eggShell.setPrintFunction(function (text) {
            rawPrint += text + '\n';
        });

        var rawPrintError = '';
        vireo.eggShell.setPrintErrorFunction(function (text) {
            rawPrintError += text + '\n';
        });

        var loadResultCode = vireo.eggShell.loadVia(viaText);

        var runSlicesAsync = function (cb) {
            expect(typeof cb).toBe('function');

            if (loadResultCode !== 0) {
                cb(rawPrint, rawPrintError);
                return;
            }

            (function runExecuteSlicesAsync () {
                var remainingSlices = vireo.eggShell.executeSlices(1000000);
                if (remainingSlices > 0) {
                    setTimeout(runExecuteSlicesAsync, 0);
                } else {
                    cb(rawPrint, rawPrintError);
                }
            }());
        };

        return runSlicesAsync;
    };

    return rebootAndLoadVia;
}));
