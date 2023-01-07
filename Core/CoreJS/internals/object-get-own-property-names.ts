import { internalObjectKeys } from "./object-keys-internal";
import { enumBugKeys } from "./enum-bug-keys";

var hiddenKeys = enumBugKeys.concat("length", "prototype");

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
export const getOwnPropertyNamesModule = {
	f:
		Object.getOwnPropertyNames ||
		function getOwnPropertyNames(O) {
			return internalObjectKeys(O, hiddenKeys);
		},
};
