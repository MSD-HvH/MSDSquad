import { toIntegerOrInfinity } from "./to-integer-or-infinity";

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
export const toLength = (argument) => {
  return argument > 0 ? Math.min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};
