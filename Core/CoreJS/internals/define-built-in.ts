import { isCallable } from "./is-callable";
import { definePropertyModule } from "./object-define-property";
import { makeBuiltIn } from "./make-built-in";
import { defineGlobalProperty } from "./define-global-property";

export const defineBuiltIn = function (O, key, value, options?) {
	if (!options) options = {};
	var simple = options.enumerable;
	var name = options.name !== undefined ? options.name : key;
	if (isCallable(value)) makeBuiltIn(value, name, options);
	if (options.global) {
		if (simple) O[key] = value;
		else defineGlobalProperty(key, value);
	} else {
		try {
			if (!options.unsafe) delete O[key];
			else if (O[key]) simple = true;
		} catch (error) {
			/* empty */
		}
		if (simple) O[key] = value;
		else
			definePropertyModule.f(O, key, {
				value: value,
				enumerable: false,
				configurable: !options.nonConfigurable,
				writable: !options.nonWritable,
			});
	}
	return O;
};
