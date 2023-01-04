var toPrimitive = require('../internals/to-primitive.js');
var isSymbol = require('../internals/is-symbol.js');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};
