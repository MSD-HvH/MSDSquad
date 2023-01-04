var uncurryThis = require('../internals/function-uncurry-this.js');
var aCallable = require('../internals/a-callable.js');
var NATIVE_BIND = require('../internals/function-bind-native.js');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};
