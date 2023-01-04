var call = require('../internals/function-call.js');
var isObject = require('../internals/is-object.js');
var isSymbol = require('../internals/is-symbol.js');
var getMethod = require('../internals/get-method.js');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive.js');
var wellKnownSymbol = require('../internals/well-known-symbol.js');

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};
