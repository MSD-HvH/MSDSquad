'use strict';
var bind = require('../internals/function-bind-context.js');
var uncurryThis = require('../internals/function-uncurry-this.js');
var toObject = require('../internals/to-object.js');
var isConstructor = require('../internals/is-constructor.js');
var getAsyncIterator = require('../internals/get-async-iterator.js');
var getIterator = require('../internals/get-iterator.js');
var getIteratorDirect = require('../internals/get-iterator-direct.js');
var getIteratorMethod = require('../internals/get-iterator-method.js');
var getMethod = require('../internals/get-method.js');
var getVirtual = require('../internals/entry-virtual.js');
var getBuiltIn = require('../internals/get-built-in.js');
var wellKnownSymbol = require('../internals/well-known-symbol.js');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator.js');
var toArray = require('../internals/async-iterator-iteration.js').toArray;

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var arrayIterator = uncurryThis(getVirtual('Array').values);
var arrayIteratorNext = uncurryThis(arrayIterator([]).next);

var safeArrayIterator = function () {
  return new SafeArrayIterator(this);
};

var SafeArrayIterator = function (O) {
  this.iterator = arrayIterator(O);
};

SafeArrayIterator.prototype.next = function () {
  return arrayIteratorNext(this.iterator);
};

// `Array.fromAsync` method implementation
// https://github.com/tc39/proposal-array-from-async
module.exports = function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  var C = this;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    var O = toObject(asyncItems);
    if (mapfn !== undefined) mapfn = bind(mapfn, thisArg);
    var usingAsyncIterator = getMethod(O, ASYNC_ITERATOR);
    var usingSyncIterator = usingAsyncIterator ? undefined : getIteratorMethod(O) || safeArrayIterator;
    var A = isConstructor(C) ? new C() : [];
    var iterator = usingAsyncIterator
      ? getAsyncIterator(O, usingAsyncIterator)
      : new AsyncFromSyncIterator(getIteratorDirect(getIterator(O, usingSyncIterator)));
    resolve(toArray(iterator, mapfn, A));
  });
};
