const MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

export const doesNotExceedSafeInteger = (it) => {
  if (it > MAX_SAFE_INTEGER) throw TypeError('Maximum allowed index exceeded');
  return it;
};