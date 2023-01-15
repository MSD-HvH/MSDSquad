import { bind } from './function-bind-context';
import { uncurryThis } from './function-uncurry-this';
import { IndexedObject } from './indexed-object';
import { toObject } from './to-object';
import { toPropertyKey } from './to-property-key';
import { lengthOfArrayLike } from './length-of-array-like';
import { create } from './object-create';
import { arrayFromConstructorAndList } from './array-from-constructor-and-list';

const $Array = Array;
const push = uncurryThis([].push);

export const $group = function ($this, callbackfn, that, specificConstructor) {
  const O = toObject($this);
  const self = IndexedObject(O);
  const boundFunction = bind(callbackfn, that);
  const target = create(null);
  const length = lengthOfArrayLike(self);
  let index = 0;
  let Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE10 builds, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};
