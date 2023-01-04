import { toIntegerOrInfinity } from "./to-integer-or-infinity";

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
export const toAbsoluteIndex = (index, length) => {
  const integer = toIntegerOrInfinity(index);
  return integer < 0 ? Math.max(integer + length, 0) : Math.min(integer, length);
};
