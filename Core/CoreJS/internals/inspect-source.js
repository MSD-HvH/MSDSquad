var uncurryThis = require('../internals/function-uncurry-this.js');
var isCallable = require('../internals/is-callable.js');
var store = require('../internals/shared-store.js');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;
