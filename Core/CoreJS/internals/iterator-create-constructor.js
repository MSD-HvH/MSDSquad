'use strict';
var IteratorPrototype = require('../internals/iterators-core.js').IteratorPrototype;
var create = require('../internals/object-create.js');
var createPropertyDescriptor = require('../internals/create-property-descriptor.js');
var setToStringTag = require('../internals/set-to-string-tag.js');
var Iterators = require('../internals/iterators.js');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};
