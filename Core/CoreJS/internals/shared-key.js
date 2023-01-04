var shared = require('../internals/shared.js');
var uid = require('../internals/uid.js');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};
