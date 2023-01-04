// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object.js');
var requireObjectCoercible = require('../internals/require-object-coercible.js');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};
