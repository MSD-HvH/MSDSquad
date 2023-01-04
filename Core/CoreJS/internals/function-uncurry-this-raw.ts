import { NATIVE_BIND } from "./function-bind-native";

const call = Function.prototype.call;
const uncurryThisWithBind = NATIVE_BIND && Function.prototype.bind.bind(call, call);

export const uncurryThisRaw = NATIVE_BIND ? uncurryThisWithBind : (fn) => {
  return function () {
    return call.apply(fn, arguments);
  };
};
