import { DESCRIPTORS } from "./descriptors";
import { IE8_DOM_DEFINE } from "./ie8-dom-define";
import { V8_PROTOTYPE_DEFINE_BUG } from "./v8-prototype-define-bug";
import { anObject } from "./an-object";
import { toPropertyKey } from "./to-property-key";

// eslint-disable-next-line es/no-object-defineproperty -- safe
const $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
const $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const ENUMERABLE = "enumerable";
const CONFIGURABLE = "configurable";
const WRITABLE = "writable";

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
export const definePropertyModule = {
	f: DESCRIPTORS
		? V8_PROTOTYPE_DEFINE_BUG
			? function defineProperty(O, P, Attributes) {
					anObject(O);
					P = toPropertyKey(P);
					anObject(Attributes);
					if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
						const current = $getOwnPropertyDescriptor(O, P);
						if (current && current[WRITABLE]) {
							O[P] = Attributes.value;
							Attributes = {
								configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
								enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
								writable: false,
							};
						}
					}
					return $defineProperty(O, P, Attributes);
			  }
			: $defineProperty
		: function defineProperty(O, P, Attributes) {
				anObject(O);
				P = toPropertyKey(P);
				anObject(Attributes);
				if (IE8_DOM_DEFINE)
					try {
						return $defineProperty(O, P, Attributes);
					} catch (error) {
						/* empty */
					}
				if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported");
				if ("value" in Attributes) O[P] = Attributes.value;
				return O;
		  },
};
