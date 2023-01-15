import { uncurryThis } from './function-uncurry-this';
import { aCallable } from './a-callable';
import { isObject } from './is-object';
import { hasOwn } from './has-own-property';
import { arraySlice } from './array-slice';
import { NATIVE_BIND } from './function-bind-native';

const $Function = Function;
const concat = uncurryThis([].concat);
const join = uncurryThis([].join);
const factories = {};

const construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    const list = [];
    for (let i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
export const bind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
  const F = aCallable(this);
  const Prototype = F.prototype;
  const partArgs = arraySlice(arguments, 1);
  const boundFunction = function bound(/* args... */) {
    const args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};
