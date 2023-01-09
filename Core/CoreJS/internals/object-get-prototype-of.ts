import { hasOwn } from "./has-own-property.js";
import { isCallable } from "./is-callable.js";
import { toObject } from "./to-object.js";
import { sharedKey } from "./shared-key.js";
import { CORRECT_PROTOTYPE_GETTER } from "./correct-prototype-getter.js";

var IE_PROTO = sharedKey("IE_PROTO");
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
export const getPrototypeOf = CORRECT_PROTOTYPE_GETTER
	? $Object.getPrototypeOf
	: function (O) {
			var object = toObject(O);
			if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
			var constructor = object.constructor;
			if (isCallable(constructor) && object instanceof constructor) {
				return constructor.prototype;
			}
			return object instanceof $Object ? ObjectPrototype : null;
	  };
