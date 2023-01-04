import { isConstructor } from "./is-constructor";
import { tryToString } from "./try-to-string";

// `Assert: IsConstructor(argument) is true`
export const aConstructor = (argument: any): any  => {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};
