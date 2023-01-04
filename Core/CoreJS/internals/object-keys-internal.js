var uncurryThis = require('../internals/function-uncurry-this.js');
var hasOwn = require('../internals/has-own-property.js');
var toIndexedObject = require('../internals/to-indexed-object.js');
var indexOf = require('../internals/array-includes.js').indexOf;
var hiddenKeys = require('../internals/hidden-keys.js');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};
