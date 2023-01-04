var getBuiltIn = require('../internals/get-built-in.js');
var isCallable = require('../internals/is-callable.js');
var isPrototypeOf = require('../internals/object-is-prototype-of.js');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid.js');

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};
