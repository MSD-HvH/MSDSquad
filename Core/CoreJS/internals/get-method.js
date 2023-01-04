var aCallable = require('../internals/a-callable.js');
import { isNullOrUndefined } from "./is-null-or-undefined";

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};
