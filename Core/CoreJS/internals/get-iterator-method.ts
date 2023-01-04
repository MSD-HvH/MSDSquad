var classof = require('./classof.js');
var getMethod = require('./get-method.js');
import { isNullOrUndefined } from "./is-null-or-undefined";
import { Iterators } from "./iterators";
var wellKnownSymbol = require('./well-known-symbol.js');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};
