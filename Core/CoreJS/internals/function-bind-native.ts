import { fails } from './fails';


export const NATIVE_BIND = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  const test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});