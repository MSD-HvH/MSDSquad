// eslint-disable-next-line es/no-math-log10 -- safe
export const log10 =Math.log10 || function log10(x) {
  return Math.log(x) * Math.LOG10E;
};