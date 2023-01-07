import { fails } from "./fails";
import { isCallable } from "./is-callable";
import { hasOwn } from "./has-own-property";
import { DESCRIPTORS } from "./descriptors";
import { functionName } from "./function-name";
import { inspectSource } from "./inspect-source";
import { InternalStateModule } from "./internal-state";

const enforceInternalState = InternalStateModule.enforce;
const getInternalState = InternalStateModule.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
const defineProperty = Object.defineProperty;

const CONFIGURABLE_LENGTH =
	DESCRIPTORS &&
	!fails(function () {
		return (
			defineProperty(
				function () {
					/* empty */
				},
				"length",
				{ value: 8 },
			).length !== 8
		);
	});

const TEMPLATE = String(String).split("String");

export const makeBuiltIn = function (value, name, options?) {
	if (String(name).slice(0, 7) === "Symbol(") {
		name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
	}
	if (options && options.getter) name = "get " + name;
	if (options && options.setter) name = "set " + name;
	if (!hasOwn(value, "name") || (functionName.CONFIGURABLE && value.name !== name)) {
		if (DESCRIPTORS) defineProperty(value, "name", { value: name, configurable: true });
		else value.name = name;
	}
	if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
		defineProperty(value, "length", { value: options.arity });
	}
	try {
		if (options && hasOwn(options, "constructor") && options.constructor) {
			if (DESCRIPTORS) defineProperty(value, "prototype", { writable: false });
			// in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
		} else if (value.prototype) value.prototype = undefined;
	} catch (error) {
		/* empty */
	}
	var state = enforceInternalState(value);
	if (!hasOwn(state, "source")) {
		state.source = TEMPLATE.join(typeof name == "string" ? name : "");
	}
	return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
	return (isCallable(this) && getInternalState(this).source) || inspectSource(this);
}, "toString");
