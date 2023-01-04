// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
export const trunc = Math.trunc || function trunc(x) {
  const n = +x;
  return (n > 0 ? Math.floor : Math.ceil)(n);
};
