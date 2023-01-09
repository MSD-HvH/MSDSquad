"use strict";
import { toPropertyKey } from "./to-property-key";
import { definePropertyModule } from "./object-define-property.js";
import { createPropertyDescriptor } from "./create-property-descriptor";

export const createProperty = (object, key, value) => {
	const propertyKey = toPropertyKey(key);
	if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
	else object[propertyKey] = value;
};
