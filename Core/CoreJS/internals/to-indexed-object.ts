// toObject with fallback for non-array-like ES3 strings
import { IndexedObject } from "./indexed-object";
import { requireObjectCoercible } from "./require-object-coercible";

export const toIndexedObject = (it) =>{
  return IndexedObject(requireObjectCoercible(it));
};
