import { classofRaw } from "./classof-raw";

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
export const isArray = Array.isArray || function isArray(argument) {
  return classofRaw(argument) == 'Array';
};