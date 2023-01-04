var call = require('../internals/function-call.js');
var aCallable = require('../internals/a-callable.js');
var anObject = require('../internals/an-object.js');
import tryToString from "./try-to-string.js";var getIteratorMethod = require('../internals/get-iterator-method.js');

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};
