import { isArray } from './is-array';
import { isConstructor } from './is-constructor';
import { isObject } from './is-object';
import { wellKnownSymbol } from './well-known-symbol';

const SPECIES = wellKnownSymbol('species');
const $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
export const arraySpeciesConstructor = function (originalArray) {
  let C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};
