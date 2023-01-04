/* eslint-disable es/no-symbol -- required for testing */
import { NATIVE_SYMBOL } from "./symbol-constructor-detection";

export const USE_SYMBOL_AS_UID = NATIVE_SYMBOL
  // @ts-ignore
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';
