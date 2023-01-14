import { aCallable } from './a-callable';
import { anObject } from './an-object';

export const getIteratorDirect = function (obj) {
  return {
    iterator: obj,
    next: aCallable(anObject(obj).next)
  };
};
