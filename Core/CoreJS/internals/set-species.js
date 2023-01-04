'use strict';
var getBuiltIn = require('../internals/get-built-in.js');
var definePropertyModule = require('../internals/object-define-property.js');
var wellKnownSymbol = require('../internals/well-known-symbol.js');
var DESCRIPTORS = require('../internals/descriptors.js');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};
