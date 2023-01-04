import { fails } from "./fails";

// Detect IE8's incomplete defineProperty implementation
export const DESCRIPTORS = !fails(() => {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});
