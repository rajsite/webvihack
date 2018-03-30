
(function () {
    'use strict';
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var webvipolyfill_propertynode_items = function (input) {
        var config = JSON.parse(input);
        var controlSelector = config['css selector in'];
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
        return String(0);
    };

    commonjsGlobal.webvipolyfill_propertynode_items = webvipolyfill_propertynode_items;
}());
