import { toLength } from "./to-length";

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
export const lengthOfArrayLike = (obj: any) => {
  return toLength(obj.length);
};
