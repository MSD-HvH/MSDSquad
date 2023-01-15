import { call } from './function-call';
import { AsyncFromSyncIterator } from './async-from-sync-iterator';
import { anObject } from './an-object';
import { getIterator } from './get-iterator';
import { getIteratorDirect } from './get-iterator-direct';
import { getMethod } from './get-method';
import { wellKnownSymbol } from './well-known-symbol';

const ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

export const getAsyncIterator = function (it, usingIterator) {
  const method = arguments.length < 2 ? getMethod(it, ASYNC_ITERATOR) : usingIterator;
  return method ? anObject(call(method, it)) : new AsyncFromSyncIterator(getIteratorDirect(getIterator(it)));
};
