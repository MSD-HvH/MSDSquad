// `Math.log1p` method implementation
// https://tc39.es/ecma262/#sec-math.log1p
// eslint-disable-next-line es/no-math-log1p -- safe
export const log1p = Math.log1p || function log1p(x) {
  const n = +x;
  return n > -1e-8 && n < 1e-8 ? n - n * n / 2 : Math.log(1 + n);
};