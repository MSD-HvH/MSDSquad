import { global } from "./global";
import { isCallable } from "./is-callable";

const aFunction = (argument) => {
  return isCallable(argument) ? argument : undefined;
};

export const getBuiltIn = function (namespace, method?) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};