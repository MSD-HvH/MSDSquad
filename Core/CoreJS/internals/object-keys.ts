import { internalObjectKeys } from "./object-keys-internal";
import { enumBugKeys } from "./enum-bug-keys";

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
export const objectKeys = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};
