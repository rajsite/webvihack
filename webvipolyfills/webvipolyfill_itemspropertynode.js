
// Error handling to implement:
// Verify reference is to a listbox type control

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['webvipolyfill'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('webvipolyfill'));
    } else {
        // MAKE SURE TO UPDATE THE root.NAME IF MODIFYING TO PREVENT COLLISIONS
        root.webvipolyfill_itemspropertynode = factory(root.webvipolyfill);
    }
}(typeof self !== 'undefined' ? self : this, function (webvipolyfill) {

    var itemspropertynode = function (input) {
        var config = JSON.parse(input);
        var controlSelector = config['ring in'];
        var element = document.querySelector(controlSelector);
        var items = config.Items;
        var formattedItems = items.map(function (item, index) {
            return {
                displayValue: item,
                value: index
            };
        });
        var formattedItemsJSON = JSON.stringify(formattedItems);
        element.items = formattedItemsJSON;
    };

    webvipolyfill.define({
        name: 'itemspropertynode',
        action: itemspropertynode
    });

    return {};
}));
