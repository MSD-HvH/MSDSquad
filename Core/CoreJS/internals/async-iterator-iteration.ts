'use strict';
// https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-array-from-async
import { call } from './function-call';
import { aCallable } from './a-callable';
import { anObject } from './an-object';
import { doesNotExceedSafeInteger } from './does-not-exceed-safe-integer';
import { getBuiltIn } from './get-built-in';
import { getIteratorDirect } from './get-iterator-direct';
import { closeAsyncIteration } from './async-iterator-close';

const createMethod = function (TYPE) {
  const IS_TO_ARRAY = TYPE == 0;
  const IS_FOR_EACH = TYPE == 1;
  const IS_EVERY = TYPE == 2;
  const IS_SOME = TYPE == 3;
  return function (object, fn, target) {
    const record = getIteratorDirect(object);
    const Promise = getBuiltIn('Promise');
    const iterator = record.iterator;
    const next = record.next;
    let index = 0;
    const MAPPING = fn !== undefined;
    if (MAPPING || !IS_TO_ARRAY) aCallable(fn);

    return new Promise(function (resolve, reject) {
      const ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      const loop = function () {
        try {
          if (IS_TO_ARRAY && MAPPING) try {
            doesNotExceedSafeInteger(index);
          } catch (error5) { ifAbruptCloseAsyncIterator(error5); }
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                if (IS_TO_ARRAY) {
                  target.length = index;
                  resolve(target);
                } else resolve(IS_SOME ? false : IS_EVERY || undefined);
              } else {
                const value = step.value;
                try {
                  if (MAPPING) {
                    Promise.resolve(IS_TO_ARRAY ? fn(value, index) : fn(value)).then(function (result) {
                      if (IS_FOR_EACH) {
                        loop();
                      } else if (IS_EVERY) {
                        result ? loop() : closeAsyncIteration(iterator, resolve, false, reject);
                      } else if (IS_TO_ARRAY) {
                        try {
                          target[index++] = result;
                          loop();
                        } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                      } else {
                        result ? closeAsyncIteration(iterator, resolve, IS_SOME || value, reject) : loop();
                      }
                    }, ifAbruptCloseAsyncIterator);
                  } else {
                    target[index++] = value;
                    loop();
                  }
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  };
};

export const toArray = createMethod(0);
export const forEach = createMethod(1);
export const every = createMethod(2);
export const some = createMethod(3);
export const find = createMethod(4);