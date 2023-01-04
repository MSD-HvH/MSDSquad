var DESCRIPTORS = require('../internals/descriptors.js');
var definePropertyModule = require('../internals/object-define-property.js');
var createPropertyDescriptor = require('../internals/create-property-descriptor.js');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};
