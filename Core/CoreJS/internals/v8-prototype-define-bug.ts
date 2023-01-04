import { DESCRIPTORS } from "./descriptors";
import { fails } from "./fails";

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
export const V8_PROTOTYPE_DEFINE_BUG = DESCRIPTORS && fails(() => {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(() => { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});
