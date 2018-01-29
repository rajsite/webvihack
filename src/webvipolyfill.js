import XHRMock from 'xhr-mock/lib/XHRMock';
import MockRequest from 'xhr-mock/lib/MockRequest';
import MockResponse from 'xhr-mock/lib/MockResponse';
import proxybrowser from 'xhr-mock/lib/proxy.browser';


var proxy;
if (typeof module === 'object' && module.exports) {
    proxy = require('xhr-mock/lib/proxy');
} else {
    proxy = proxybrowser;
}

XHRMock.setup();

// var proxyproxy = function () {
//     var ret = proxy.apply(this, arguments);
//     console.log('proxied a call');
//     var ret;
// };

XHRMock.use(proxy);

export default {
}
