import { TO_STRING_TAG_SUPPORT } from "./to-string-tag-support.js";
import { isCallable } from "./is-callable.js";
import { classofRaw } from "./classof-raw.js";
import { wellKnownSymbol } from "./well-known-symbol.js";

var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS =
	classofRaw(
		(function () {
			return arguments;
		})(),
	) == "Arguments";

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
	try {
		return it[key];
	} catch (error) {
		/* empty */
	}
};

// getting tag from ES6+ `Object.prototype.toString`
export const classof = TO_STRING_TAG_SUPPORT
	? classofRaw
	: function (it) {
			var O, tag, result;
			return it === undefined
				? "Undefined"
				: it === null
				? "Null"
				: // @@toStringTag case
				typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) == "string"
				? tag
				: // builtinTag case
				CORRECT_ARGUMENTS
				? classofRaw(O)
				: // ES3 arguments fallback
				(result = classofRaw(O)) == "Object" && isCallable(O.callee)
				? "Arguments"
				: result;
	  };
