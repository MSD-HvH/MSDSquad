'use strict';
import { toObject } from './to-object';
import { toAbsoluteIndex } from './to-absolute-index';
import { lengthOfArrayLike } from './length-of-array-like';
import { deletePropertyOrThrow } from './delete-property-or-throw';

const min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
export const copyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  const O = toObject(this);
  const len = lengthOfArrayLike(O);
  let to = toAbsoluteIndex(target, len);
  let from = toAbsoluteIndex(start, len);
  const end = arguments.length > 2 ? arguments[2] : undefined;
  let count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  let inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else deletePropertyOrThrow(O, to);
    to += inc;
    from += inc;
  } return O;
};
