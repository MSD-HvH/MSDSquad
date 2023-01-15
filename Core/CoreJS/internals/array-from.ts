'use strict';
import { bind } from './function-bind-context';
import { call } from './function-call';
import { toObject } from './to-object';
import { callWithSafeIterationClosing } from './call-with-safe-iteration-closing';
import { isArrayIteratorMethod } from './is-array-iterator-method';
import { isConstructor } from './is-constructor';
import { lengthOfArrayLike } from './length-of-array-like';
import { createProperty } from './create-property';
import { getIterator } from './get-iterator';
import { getIteratorMethod } from './get-iterator-method';

const $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
export const from = function(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  const O = toObject(arrayLike);
  const IS_CONSTRUCTOR = isConstructor(this);
  const argumentsLength = arguments.length;
  let mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  const mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  const iteratorMethod = getIteratorMethod(O);
  let index = 0;
  let length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};
