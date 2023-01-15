import { NATIVE_BIND } from './function-bind-native';

const FunctionPrototype = Function.prototype;
const oApply = FunctionPrototype.apply;
const call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
export const apply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(oApply) : function () {
  return call.apply(apply, arguments);
});
