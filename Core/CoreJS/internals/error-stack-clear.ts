import { uncurryThis } from "./function-uncurry-this";

const replace = uncurryThis(''.replace);

const TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
const V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
const IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

export const clearErrorStack = (stack, dropEntries) => {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};
