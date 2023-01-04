var DESCRIPTORS = require('../internals/descriptors.js');
import { fails } from "./fails";
var createElement = require('../internals/document-create-element.js');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});
