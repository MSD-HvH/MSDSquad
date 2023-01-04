var getBuiltIn = require('../internals/get-built-in.js');
var uncurryThis = require('../internals/function-uncurry-this.js');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names.js');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols.js');
var anObject = require('../internals/an-object.js');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};
