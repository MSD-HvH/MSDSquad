import { DESCRIPTORS } from "./descriptors";
import { hasOwn } from "./has-own-property";

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
const getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

const EXISTS = hasOwn(Function.prototype, 'name');
// additional protection from minified / mangled / dropped function names
const PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
const CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(Function.prototype, 'name').configurable));

export const functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};