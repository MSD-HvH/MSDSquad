import { DESCRIPTORS } from "./descriptors";
import { fails } from "./fails";
import { createElement } from "./document-create-element";

// Thanks to IE8 for its funny defineProperty
export const IE8_DOM_DEFINE = !DESCRIPTORS && !fails(() => {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: () => 7
  }).a != 7;
});