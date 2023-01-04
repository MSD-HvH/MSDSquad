import { uncurryThis } from "./function-uncurry-this";
import { toObject } from "./to-object";

const hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
// @ts-ignore
export const hasOwn = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};