import { bind } from './function-bind-context';
import { uncurryThis } from './function-uncurry-this';
import { IndexedObject } from './indexed-object';
import { toObject } from './to-object';
import { lengthOfArrayLike } from './length-of-array-like';
import { arraySpeciesCreate } from './array-species-create';

const push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
const createMethod = function (TYPE) {
  const IS_MAP = TYPE == 1;
  const IS_FILTER = TYPE == 2;
  const IS_SOME = TYPE == 3;
  const IS_EVERY = TYPE == 4;
  const IS_FIND_INDEX = TYPE == 6;
  const IS_FILTER_REJECT = TYPE == 7;
  const NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate?) {
    const O = toObject($this);
    const self = IndexedObject(O);
    const boundFunction = bind(callbackfn, that);
    const length = lengthOfArrayLike(self);
    let index = 0;
    const create = specificCreate || arraySpeciesCreate;
    const target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    let value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

export const $forEach = createMethod(0);
export const $map = createMethod(1);
export const $filter = createMethod(2);
export const $some = createMethod(3);
export const $every = createMethod(4);
export const $find = createMethod(5);
export const $findIndex = createMethod(6);
export const $filterReject  = createMethod(7);