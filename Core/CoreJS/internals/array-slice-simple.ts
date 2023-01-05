import { toAbsoluteIndex } from "./to-absolute-index";
import { lengthOfArrayLike } from "./length-of-array-like";
import { createProperty } from "./create-property";

export const arraySlice = (O, start, end) => {
  const length = lengthOfArrayLike(O);
  let k = toAbsoluteIndex(start, length);
  const fin = toAbsoluteIndex(end === undefined ? length : end, length);
  const result = Array(Math.max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};