import { toPrimitive } from './to-primitive';

const $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
export const toBigInt = function (argument) {
  const prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};
