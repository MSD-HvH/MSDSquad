var global = require('../internals/global.js');
var defineGlobalProperty = require('../internals/define-global-property.js');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;
