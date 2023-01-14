import { call } from './function-call';
import { aCallable } from './a-callable';
import { anObject } from './an-object';
import { tryToString } from "./try-to-string";
import { getIteratorMethod } from './get-iterator-method';

const $TypeError = TypeError;

export const getIterator = function (argument, usingIterator) {
  const iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};
