import { global } from "./global";
import { getOwnPropertyDescriptorModule } from "./object-get-own-property-descriptor";
import { createNonEnumerableProperty } from "./create-non-enumerable-property";
import { defineBuiltIn } from "./define-built-in";
import { defineGlobalProperty } from "./define-global-property";
import { copyConstructorProperties } from "./copy-constructor-properties";
import { isForced } from "./is-forced";

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
export const $ = function (options, source) {
	var TARGET = options.target;
	var GLOBAL = options.global;
	var STATIC = options.stat;
	var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	if (GLOBAL) {
		target = global;
	} else if (STATIC) {
		target = global[TARGET] || defineGlobalProperty(TARGET, {});
	} else {
		target = (global[TARGET] || {}).prototype;
	}
	if (target)
		for (key in source) {
			sourceProperty = source[key];
			if (options.dontCallGetSet) {
				descriptor = getOwnPropertyDescriptorModule.f(target, key);
				targetProperty = descriptor && descriptor.value;
			} else targetProperty = target[key];
			FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
			// contained in target
			if (!FORCED && targetProperty !== undefined) {
				if (typeof sourceProperty == typeof targetProperty) continue;
				copyConstructorProperties(sourceProperty, targetProperty);
			}
			// add a flag to not completely full polyfills
			if (options.sham || (targetProperty && targetProperty.sham)) {
				createNonEnumerableProperty(sourceProperty, "sham", true);
			}
			defineBuiltIn(target, key, sourceProperty, options);
		}
};
