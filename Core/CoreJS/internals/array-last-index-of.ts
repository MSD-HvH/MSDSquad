'use strict';
/* eslint-disable es/no-array-prototype-lastindexof -- safe */
import { apply } from './function-apply';
import { toIndexedObject } from './to-indexed-object';
import { toIntegerOrInfinity } from './to-integer-or-infinity';
import { lengthOfArrayLike } from './length-of-array-like';
import { arrayMethodIsStrict } from './array-method-is-strict';

const min = Math.min;
const $lastIndexOf = [].lastIndexOf;
const NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
const STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
const FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
export const lastIndexOf = FORCED ? function(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  const O = toIndexedObject(this);
  const length = lengthOfArrayLike(O);
  let index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;
