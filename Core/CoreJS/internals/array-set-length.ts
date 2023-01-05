'use strict';
import { DESCRIPTORS } from "./descriptors";
import { isArray } from "./is-array";

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
const SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

export const setArrayLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? (O, length) => {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw TypeError('Cannot set read only .length');
  } return O.length = length;
} : (O, length) => {
  return O.length = length;
};