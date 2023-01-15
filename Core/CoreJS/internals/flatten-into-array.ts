'use strict';
import { isArray } from './is-array';
import { lengthOfArrayLike } from './length-of-array-like';
import { doesNotExceedSafeInteger } from './does-not-exceed-safe-integer';
import { bind } from '../internals/function-bind-context';

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
export const flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper?, thisArg?) {
  let targetIndex = start;
  let sourceIndex = 0;
  const mapFn = mapper ? bind(mapper, thisArg) : false;
  let element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};