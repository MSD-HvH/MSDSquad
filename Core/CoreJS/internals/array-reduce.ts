import { aCallable } from './a-callable';
import { toObject } from './to-object';
import { IndexedObject } from './indexed-object';
import { lengthOfArrayLike } from './length-of-array-like';

const $TypeError = TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
const createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    const O = toObject(that);
    const self = IndexedObject(O);
    const length = lengthOfArrayLike(O);
    let index = IS_RIGHT ? length - 1 : 0;
    const i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) for (;;) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw $TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

export const left = createMethod(false);
export const right = createMethod(true);