import { DESCRIPTORS } from "./descriptors";
import { f } from "./object-define-property";
import { createPropertyDescriptor } from "./create-property-descriptor";

export const createNonEnumerableProperty = DESCRIPTORS ? (object, key, value) => {
  return f(object, key, createPropertyDescriptor(1, value));
} : (object, key, value) => {
  object[key] = value;
  return object;
};
