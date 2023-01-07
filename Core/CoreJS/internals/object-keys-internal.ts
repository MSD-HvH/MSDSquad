import { uncurryThis } from "./function-uncurry-this";
import { hasOwn } from "./has-own-property";
import { toIndexedObject } from "./to-indexed-object";
import { arrayIncludes } from "./array-includes";
import { hiddenKeys } from "./hidden-keys";

var push = uncurryThis([].push);

export const internalObjectKeys = function (object, names) {
	var O = toIndexedObject(object);
	var i = 0;
	var result = [];
	var key;
	for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
	// Don't enum bug & hidden keys
	while (names.length > i)
		if (hasOwn(O, (key = names[i++]))) {
			~arrayIncludes.indexOf(result, key) || push(result, key);
		}
	return result;
};
