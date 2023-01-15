'use strict';
import { bind } from './function-bind-context';
import { uncurryThis } from './function-uncurry-this';
import { toObject } from './to-object';
import { isConstructor } from './is-constructor';
import { getAsyncIterator } from './get-async-iterator';
import { getIterator } from './get-iterator';
import { getIteratorDirect } from './get-iterator-direct';
import { getIteratorMethod } from './get-iterator-method';
import { getMethod } from './get-method';
import { entryVirtual } from './entry-virtual';
import { getBuiltIn } from './get-built-in';
import { wellKnownSymbol } from './well-known-symbol';
import { AsyncFromSyncIterator } from './async-from-sync-iterator';
import { toArray } from './async-iterator-iteration';

const ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
const arrayIterator = uncurryThis(entryVirtual('Array').values);
const arrayIteratorNext = uncurryThis(arrayIterator([]).next);

const safeArrayIterator = function () {
  return new SafeArrayIterator(this);
};

const SafeArrayIterator = function (O) {
  this.iterator = arrayIterator(O);
};

SafeArrayIterator.prototype.next = function () {
  return arrayIteratorNext(this.iterator);
};

// `Array.fromAsync` method implementation
// https://github.com/tc39/proposal-array-from-async
export const fromAsync = function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  const C = this;
  const argumentsLength = arguments.length;
  let mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  const thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    const O = toObject(asyncItems);
    if (mapfn !== undefined) mapfn = bind(mapfn, thisArg);
    const usingAsyncIterator = getMethod(O, ASYNC_ITERATOR);
    const usingSyncIterator = usingAsyncIterator ? undefined : getIteratorMethod(O) || safeArrayIterator;
    const A = isConstructor(C) ? new C() : [];
    const iterator = usingAsyncIterator
      ? getAsyncIterator(O, usingAsyncIterator)
      : new AsyncFromSyncIterator(getIteratorDirect(getIterator(O, usingSyncIterator)));
    resolve(toArray(iterator, mapfn, A));
  });
};
