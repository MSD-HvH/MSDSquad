var DESCRIPTORS = require('../internals/descriptors.js');
var call = require('../internals/function-call.js');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable.js');
var createPropertyDescriptor = require('../internals/create-property-descriptor.js');
var toIndexedObject = require('../internals/to-indexed-object.js');
var toPropertyKey = require('../internals/to-property-key.js');
var hasOwn = require('../internals/has-own-property.js');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define.js');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};
