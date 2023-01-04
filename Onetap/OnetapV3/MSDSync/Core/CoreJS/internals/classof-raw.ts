import { uncurryThisRaw } from "./function-uncurry-this-raw";

var toString = uncurryThisRaw({}.toString);
var stringSlice = uncurryThisRaw(''.slice);

export const classofRaw = (it) => {
  return stringSlice(toString(it), 8, -1);
};
