import { DESCRIPTORS } from "./descriptors";
import { definePropertyModule } from "./object-define-property";
import { createPropertyDescriptor } from "./create-property-descriptor";

export const createNonEnumerableProperty = DESCRIPTORS
	? (object, key, value) => {
			return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	  }
	: (object, key, value) => {
			object[key] = value;
			return object;
	  };
