'use strict';
var toPropertyKey = require('../internals/to-property-key.js');
var definePropertyModule = require('../internals/object-define-property.js');
var createPropertyDescriptor = require('../internals/create-property-descriptor.js');

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};
