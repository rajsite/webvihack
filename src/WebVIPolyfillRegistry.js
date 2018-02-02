
var WebVIPolyfillRegistry = function () {
    this.polyfillPromises = [];
    this.polyfillMap = undefined;
}

// Accepts an array of webvipolyfills or a promise
WebVIPolyfillRegistry.prototype.define = function (polyfillsOrPromise) {
    var that = this;
    if (that.polyfillMap !== undefined) {
        throw new Error('All Polyfills already resolved, make sure to define webvipolyfills before execution');
    }

    var webvipolyfillsPromise = Promise.resolve(polyfillsOrPromise).then(function (polyfills) {
        if (Array.isArray(polyfills) === false) {
            throw new Error('Expected an array of webvipolyfill config objects, received the following:', polyfills);
        }

        polyfills.forEach(function (polyfill) {
            if (typeof polyfill !== 'object' || polyfill === null) {
                throw new Error('Expected a webvipolyfill config object, received the following', polyfill);
            }

            if (typeof polyfill.name !== 'string' || /^([a-z]\w*)$/.exec(polyfill.name) === null) {
                throw new Error('Expected webvipolyfill config to be a valid string name, received the following', polyfill.name);
            }

            if (typeof polyfill.action !== 'function') {
                throw new Error('Expected webvipolyfill config to have an action, received the following', polyfill.action);
            }
        });

        return polyfills;
    });

    that.polyfillPromises.push(webvipolyfillsPromise);
};

WebVIPolyfillRegistry.prototype._getPolyfillAction = function (name) {
    var that =this;
    return that._resolveAllPolyfills().then(function (polyfillMap) {
        var polyfill = polyfillMap.get(name);
        if (polyfill === undefined) {
            throw new Error('No polyfill resolved for polyfill with name: ', name);
        }

        return polyfill.action;
    });
};

WebVIPolyfillRegistry.prototype._resolveAllPolyfills = function () {
    var that = this;
    if (that.polyfillMap === undefined) {
        that.polyfillMap = Promise.all(that.polyfillPromises).then(function(listOfPolyfills) {
            var flattenedList = listOfPolyfills.reduce(function (flattenedList, polyfills) {
                return flattenedList.concat(polyfills);
            }, []);
            
            var polyfillMap = flattenedList.reduce(function (polyfillMap, polyfill) {
                if (polyfillMap.has(polyfill.name)) {
                    throw new Error('Multiple polyfills registered with name: ', polyfill.name);
                }

                polyfillMap.set(polyfill.name, polyfill);
                return polyfillMap;
            }, new Map());

            that.polyfillPromises = undefined;
            return polyfillMap;
        });
    }

    return that.polyfillMap;
};

export default WebVIPolyfillRegistry;
