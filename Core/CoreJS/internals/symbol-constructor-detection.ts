/* eslint-disable es/no-symbol -- required for testing */
import { V8_VERSION } from "./engine-v8-version";
import { fails } from "./fails";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
export const NATIVE_SYMBOL = !!Object.getOwnPropertySymbols && !fails(() => {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    // @ts-ignore
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});