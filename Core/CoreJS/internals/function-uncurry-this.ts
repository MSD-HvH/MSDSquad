import { classofRaw } from "./classof-raw";
import { uncurryThisRaw } from "./function-uncurry-this-raw";

export const uncurryThis = (fn) => {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThisRaw(fn);
};
