
var WebVIPolyfillRegistry = function () {
    this._polyfillMap = new Map();
}

// Accepts a polyfillConfig object with a name field and an action field of either a function or a Promise resolving to a function
WebVIPolyfillRegistry.prototype.define = function (polyfillConfig) {
    var that = this;
    if (typeof polyfillConfig !== 'object' || polyfillConfig === null) {
        throw new Error('Expected a webvipolyfill config object, received the following: ' + polyfillConfig);
    }

    if (typeof polyfillConfig.name !== 'string' || /^([a-z]\w*)$/.exec(polyfillConfig.name) === null) {
        throw new Error('Expected webvipolyfill config to be a valid string name, received the following: ' + polyfillConfig.name);
    }

    if (that._polyfillMap.has(polyfillConfig.name)) {
        throw new Error('A polyfill with the following name has already been registered: ' + polyfillConfig.name);
    }

    var polyfillActionPromise = Promise.resolve(polyfillConfig.action).then(function (polyfillAction) {
        if (typeof polyfillAction !== 'function') {
            throw new Error('Expected webvipolyfill config to have an action, received config with name: ' + polyfillConfig.name + ' and action: ' + polyfillAction);
        }

        return polyfillAction;
    });

    that._polyfillMap.set(polyfillConfig.name, polyfillActionPromise);
};

WebVIPolyfillRegistry.prototype._getPolyfillActionPromise = function (name) {
    var polyfillActionPromise = this._polyfillMap.get(name);
    if (polyfillActionPromise === undefined) {
        throw new Error('No polyfill resolved for polyfill with name: ', name);
    }

    return polyfillActionPromise;
};

export default WebVIPolyfillRegistry;
