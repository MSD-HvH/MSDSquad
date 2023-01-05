import { call } from "./function-call";
import { isObject } from "./is-object";
import { isSymbol } from "./is-symbol";
import { getMethod } from "./get-method";
import { ordinaryToPrimitive } from "./ordinary-to-primitive";
import { wellKnownSymbol } from "./well-known-symbol";

const TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
export const toPrimitive = (input, pref) => {
  if (!isObject(input) || isSymbol(input)) return input;
  const exoticToPrim = getMethod(input, TO_PRIMITIVE);
  let result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};