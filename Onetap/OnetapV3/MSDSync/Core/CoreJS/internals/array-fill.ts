'use strict';
import { toObject } from "./to-object";
import { toAbsoluteIndex } from "./to-absolute-index";
import { lengthOfArrayLike } from "./length-of-array-like";

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
export const arrayFill = function fill(value /* , start = 0, end = @length */) {
  const O = toObject(this);
  const length = lengthOfArrayLike(O);
  const argumentsLength = arguments.length;
  let index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  const end = argumentsLength > 2 ? arguments[2] : undefined;
  const endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};