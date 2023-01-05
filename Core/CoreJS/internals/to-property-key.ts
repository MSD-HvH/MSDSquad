import { toPrimitive } from "./to-primitive";
import { isSymbol } from "./is-symbol";

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
export const toPropertyKey = (argument) => {
  const key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};