var wellKnownSymbol = require('../internals/well-known-symbol.js');
var Iterators = require('../internals/iterators.js');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};
