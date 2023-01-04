import { lengthOfArrayLike } from "./length-of-array-like";

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
export const arrayToReversed = (O, C) => {
  const len = lengthOfArrayLike(O);
  const A = new C(len);
  let k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};
