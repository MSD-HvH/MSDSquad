import { classof } from './classof';
import { getMethod } from './get-method';
import { isNullOrUndefined } from "./is-null-or-undefined";
import { Iterators } from "./iterators";
import { wellKnownSymbol } from './well-known-symbol';

const ITERATOR = wellKnownSymbol('iterator');

export const getIteratorMethod = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};
