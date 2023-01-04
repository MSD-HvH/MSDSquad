import { NATIVE_SYMBOL } from "./symbol-constructor-detection";

/* eslint-disable es/no-symbol -- safe */
export const NATIVE_SYMBOL_REGISTRY = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;