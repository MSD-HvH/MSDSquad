var getBuiltIn = require('../internals/get-built-in.js');

module.exports = getBuiltIn('navigator', 'userAgent') || '';
