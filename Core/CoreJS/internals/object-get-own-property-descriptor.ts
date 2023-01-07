import { DESCRIPTORS } from "./descriptors";
import { call } from "./function-call";
import * as propertyIsEnumerableModule from "./object-property-is-enumerable";
import { createPropertyDescriptor } from "./create-property-descriptor";
import { toIndexedObject } from "./to-indexed-object";
import { toPropertyKey } from "./to-property-key";
import { hasOwn } from "./has-own-property";
import { IE8_DOM_DEFINE } from "./ie8-dom-define";

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
const $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
export const getOwnPropertyDescriptorModule = {
	f: DESCRIPTORS
		? $getOwnPropertyDescriptor
		: function getOwnPropertyDescriptor(O, P) {
				O = toIndexedObject(O);
				P = toPropertyKey(P);
				if (IE8_DOM_DEFINE)
					try {
						return $getOwnPropertyDescriptor(O, P);
					} catch (error) {
						/* empty */
					}
				if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
		  },
};
