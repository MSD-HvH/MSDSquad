'use strict';
import { stringMultibyte } from "./string-multibyte";

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
export const advanceStringIndex = (S, index, unicode) => {
  return index + (unicode ? stringMultibyte.charAt(S, index).length : 1);
};
