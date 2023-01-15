import { bind } from './function-bind-context';
import { IndexedObject } from './indexed-object';
import { toObject } from './to-object';
import { lengthOfArrayLike } from './length-of-array-like';

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
const createMethod = function (TYPE) {
  const IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    const O = toObject($this);
    const self = IndexedObject(O);
    const boundFunction = bind(callbackfn, that);
    let index = lengthOfArrayLike(self);
    let value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

export const findLast = createMethod(0);
export const findLastIndex = createMethod(1);