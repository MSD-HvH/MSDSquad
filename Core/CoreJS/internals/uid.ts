import { uncurryThis } from "./function-uncurry-this";

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

export const uid = (key) => {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};