import { getBuiltIn } from "./get-built-in";
import { isCallable } from "./is-callable";
import { isPrototypeOf } from "./object-is-prototype-of";
import { USE_SYMBOL_AS_UID } from "./use-symbol-as-uid";

export const isSymbol = USE_SYMBOL_AS_UID ? (it) => {
  return typeof it == 'symbol';
} : (it) => {
  const $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};