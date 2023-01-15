'use strict';
import { call } from './function-call';
import { anObject } from './an-object';
import { create } from './object-create';
import { getMethod } from './get-method';
import { defineBuiltIns } from './define-built-ins';
import { InternalStateModule } from './internal-state';
import { getBuiltIn } from './get-built-in';
import { AsyncIteratorPrototype } from './async-iterator-prototype';
import { createIterResultObject } from './create-iter-result-object';

const Promise = getBuiltIn('Promise');

const ASYNC_FROM_SYNC_ITERATOR = 'AsyncFromSyncIterator';
const setInternalState = InternalStateModule.set;
const getInternalState = InternalStateModule.getterFor(ASYNC_FROM_SYNC_ITERATOR);

const asyncFromSyncIteratorContinuation = function (result, resolve, reject) {
  const done = result.done;
  Promise.resolve(result.value).then(function (value) {
    resolve(createIterResultObject(value, done));
  }, reject);
};

export const AsyncFromSyncIterator = function (iteratorRecord) {
  iteratorRecord.type = ASYNC_FROM_SYNC_ITERATOR;
  setInternalState(this, iteratorRecord);
};

AsyncFromSyncIterator.prototype = defineBuiltIns(create(AsyncIteratorPrototype), {
  next: function next() {
    const state = getInternalState(this);
    return new Promise(function (resolve, reject) {
      const result = anObject(call(state.next, state.iterator));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  },
  'return': function () {
    const iterator = getInternalState(this).iterator;
    return new Promise(function (resolve, reject) {
      const $return = getMethod(iterator, 'return');
      if ($return === undefined) return resolve(createIterResultObject(undefined, true));
      const result = anObject(call($return, iterator));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  }
});

