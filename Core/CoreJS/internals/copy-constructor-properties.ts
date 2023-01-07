import { hasOwn } from "./has-own-property";
import { ownKeys } from "./own-keys";
import { getOwnPropertyDescriptorModule } from "./object-get-own-property-descriptor";
import { definePropertyModule } from "./object-define-property";

export const copyConstructorProperties = function (target, source, exceptions?) {
	var keys = ownKeys(source);
	var defineProperty = definePropertyModule.f;
	var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
			defineProperty(target, key, getOwnPropertyDescriptor(source, key));
		}
	}
};
