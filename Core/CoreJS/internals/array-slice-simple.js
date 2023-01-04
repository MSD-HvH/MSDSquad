var toAbsoluteIndex = require('../internals/to-absolute-index.js');
var lengthOfArrayLike = require('../internals/length-of-array-like.js');
var createProperty = require('../internals/create-property.js');

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};
