var defineProperty = require('../internals/object-define-property.js').f;
var hasOwn = require('../internals/has-own-property.js');
var wellKnownSymbol = require('../internals/well-known-symbol.js');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};
