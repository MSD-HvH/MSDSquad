'use strict';
import { tryToString } from "./try-to-string";

export const deletePropertyOrThrow = (O, P) => {
  if (!delete O[P]) throw TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};
