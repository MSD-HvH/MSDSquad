var global = require('../internals/global.js');
var isCallable = require('../internals/is-callable.js');

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
