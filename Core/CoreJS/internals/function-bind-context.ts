import { uncurryThis } from './function-uncurry-this';
import { aCallable } from './a-callable';
import { NATIVE_BIND } from './function-bind-native';

const oBind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
export const bind = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? oBind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};
