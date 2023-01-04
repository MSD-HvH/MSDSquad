import { uncurryThis } from "./function-uncurry-this";
import { fails } from "./fails";
import { classofRaw } from "./classof-raw";

// fallback for non-array-like ES3 and non-enumerable old V8 strings
export const IndexedObject = fails(() => {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? (it) => {
  return classofRaw(it) == 'String' ? uncurryThis(''.split)(it, '') : Object(it);
} : Object;
