var DESCRIPTORS = require('../internals/descriptors.js');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug.js');
var definePropertyModule = require('../internals/object-define-property.js');
var anObject = require('../internals/an-object.js');
var toIndexedObject = require('../internals/to-indexed-object.js');
var objectKeys = require('../internals/object-keys.js');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};
