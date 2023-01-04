import { isNullOrUndefined } from "./is-null-or-undefined";

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
export const requireObjectCoercible = (it) => {
  if (isNullOrUndefined(it)) throw TypeError("Can't call method on " + it);
  return it;
};
