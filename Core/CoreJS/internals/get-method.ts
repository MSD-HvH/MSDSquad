import { aCallable } from "./a-callable";
import { isNullOrUndefined } from "./is-null-or-undefined";

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
export const getMethod = (V, P) => {
  const func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};