/* eslint-disable es/no-symbol -- required for testing */
import { NATIVE_SYMBOL } from "./symbol-constructor-detection";

// @ts-ignore
export const USE_SYMBOL_AS_UID = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';