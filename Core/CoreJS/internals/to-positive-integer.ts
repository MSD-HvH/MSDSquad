import { toIntegerOrInfinity } from "./to-integer-or-infinity";

export const toPositiveInteger = (it) => {
  const result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};
