var NATIVE_BIND = require('../internals/function-bind-native.js');

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};
