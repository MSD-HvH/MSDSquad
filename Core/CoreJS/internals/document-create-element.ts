import { global } from "./global";
import { isObject } from "./is-object";

// typeof document.createElement is 'object' in old IE
const EXISTS = isObject(global.document) && isObject(global.document.createElement);

export const createElement = (it) => {
  return EXISTS ? global.document.createElement(it) : {};
};