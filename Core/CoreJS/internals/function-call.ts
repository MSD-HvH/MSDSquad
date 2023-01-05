import { NATIVE_BIND } from "./function-bind-native";

export const call = NATIVE_BIND ? Function.prototype.call.bind(Function.prototype.call) : function () {
  return Function.prototype.call.apply(Function.prototype.call, arguments);
};