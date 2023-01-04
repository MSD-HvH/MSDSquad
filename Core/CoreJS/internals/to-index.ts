import { toIntegerOrInfinity } from "./to-integer-or-infinity";
import { toLength } from "./to-length";

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
export const toIndex = (it) => {
  if (it === undefined) return 0;
  const number = toIntegerOrInfinity(it);
  const length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};
