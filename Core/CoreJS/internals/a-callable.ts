import { isCallable } from "./is-callable";
import { tryToString } from "./try-to-string";

// `Assert: IsCallable(argument) is true`
export const aCallable = (argument: any): any => {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};
