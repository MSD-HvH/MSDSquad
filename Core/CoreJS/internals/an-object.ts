import { isObject } from "./is-object.js";

// `Assert: Type(argument) is Object`
export const anObject = (argument) => {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};
