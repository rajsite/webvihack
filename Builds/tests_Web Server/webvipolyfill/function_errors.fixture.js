(function () {
    'use strict';

    window.errorsWhenCalled = function() {
        throw new Error('Sorry for the error');
    };
}());
