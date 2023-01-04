var defineBuiltIn = require('../internals/define-built-in.js');

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};
