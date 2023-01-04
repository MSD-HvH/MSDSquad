// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
export const sign = Math.sign || function sign(x) {
  const n = +x;
  // eslint-disable-next-line no-self-compare -- NaN check
  return n == 0 || n != n ? n : n < 0 ? -1 : 1;
};
