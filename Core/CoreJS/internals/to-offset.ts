import { toPositiveInteger } from "./to-positive-integer";

export const toOffset = (it, BYTES) => {
  const offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};
