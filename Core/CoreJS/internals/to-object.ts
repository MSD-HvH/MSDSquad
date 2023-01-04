import { requireObjectCoercible } from "./require-object-coercible";

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
export const toObject = (argument) => {
  return Object(requireObjectCoercible(argument));
};
