import { fails } from './fails';
import { wellKnownSymbol } from './well-known-symbol';
import { V8_VERSION } from './engine-v8-version';

const SPECIES = wellKnownSymbol('species');

export const arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    const array = [];
    const constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};
