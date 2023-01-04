var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support.js');
var defineBuiltIn = require('../internals/define-built-in.js');
var toString = require('../internals/object-to-string.js');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}
