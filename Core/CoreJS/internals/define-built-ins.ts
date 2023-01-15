import { defineBuiltIn } from './define-built-in';

export const defineBuiltIns = function (target, src, options?) {
  for (const key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};
