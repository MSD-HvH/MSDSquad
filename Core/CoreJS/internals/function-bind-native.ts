import { fails } from "./fails";

export const NATIVE_BIND = !fails(() => {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  // @ts-ignore
  const test = (() => { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});
