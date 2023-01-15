import { global } from './global';
import { store } from './shared-store';
import { isCallable } from './is-callable';
import { create } from './object-create';
import { getPrototypeOf } from './object-get-prototype-of';
import { defineBuiltIn } from './define-built-in';
import { wellKnownSymbol } from './well-known-symbol';
import { IS_PURE } from './is-pure';

const USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
const ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
const AsyncIterator = global.AsyncIterator;
const PassedAsyncIteratorPrototype = store.AsyncIteratorPrototype;
export let AsyncIteratorPrototype, prototype;

if (PassedAsyncIteratorPrototype) {
  AsyncIteratorPrototype = PassedAsyncIteratorPrototype;
} else if (isCallable(AsyncIterator)) {
  AsyncIteratorPrototype = AsyncIterator.prototype;
} else if (store[USE_FUNCTION_CONSTRUCTOR] || global[USE_FUNCTION_CONSTRUCTOR]) {
  try {
    // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
    prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
    if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
  } catch (error) { /* empty */ }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};
else if (IS_PURE) AsyncIteratorPrototype = create(AsyncIteratorPrototype);

if (!isCallable(AsyncIteratorPrototype[ASYNC_ITERATOR])) {
  defineBuiltIn(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;
