import { toIndexedObject } from "./to-indexed-object";
import { toAbsoluteIndex } from "./to-absolute-index";
import { lengthOfArrayLike } from "./length-of-array-like";

// `Array.prototype.{ indexOf, includes }` methods implementation
const createMethod = (IS_INCLUDES: boolean) => {
  return ($this, el, fromIndex) => {
    const O = toIndexedObject($this);
    const length = lengthOfArrayLike(O);
    let index = toAbsoluteIndex(fromIndex, length);
    let value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

export const arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};