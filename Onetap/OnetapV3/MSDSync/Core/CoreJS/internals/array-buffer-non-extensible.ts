// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
import { fails } from "./fails";

export const ARRAY_BUFFER_NON_EXTENSIBLE = fails(() => {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});