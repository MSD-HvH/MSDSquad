"use strict";
import { NATIVE_ARRAY_BUFFER } from "../internals/array-buffer-basic-detection";
import { DESCRIPTORS } from "../internals/descriptors";
import { global } from "../internals/global";
import { isCallable } from "../internals/is-callable";
import { isObject } from "../internals/is-object";
import { hasOwn } from "../internals/has-own-property";
import { classof } from "../internals/classof";
import { tryToString } from "./try-to-string";
import { createNonEnumerableProperty } from "../internals/create-non-enumerable-property";
import { defineBuiltIn } from "../internals/define-built-in";
import { definePropertyModule } from "../internals/object-define-property";
import { isPrototypeOf } from "../internals/object-is-prototype-of";
import { getPrototypeOf } from "../internals/object-get-prototype-of";
import { setPrototypeOf } from "./object-set-prototype-of";
import { wellKnownSymbol } from "../internals/well-known-symbol";
import { uid } from "../internals/uid";
import { InternalStateModule } from "../internals/internal-state";

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var TYPED_ARRAY_TAG = uid("TYPED_ARRAY_TAG");
var TYPED_ARRAY_CONSTRUCTOR = "TypedArrayConstructor";
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== "Opera";
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
	Int8Array: 1,
	Uint8Array: 1,
	Uint8ClampedArray: 1,
	Int16Array: 2,
	Uint16Array: 2,
	Int32Array: 4,
	Uint32Array: 4,
	Float32Array: 4,
	Float64Array: 8,
};

var BigIntArrayConstructorsList = {
	BigInt64Array: 8,
	BigUint64Array: 8,
};

var isView = function isView(it) {
	if (!isObject(it)) return false;
	var klass = classof(it);
	return klass === "DataView" || hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
	var proto = getPrototypeOf(it);
	if (!isObject(proto)) return;
	var state = getInternalState(proto);
	return state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
	if (!isObject(it)) return false;
	var klass = classof(it);
	return hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
	if (isTypedArray(it)) return it;
	throw TypeError("Target is not a typed array");
};

var aTypedArrayConstructor = function (C) {
	if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
	throw TypeError(tryToString(C) + " is not a typed array constructor");
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
	if (!DESCRIPTORS) return;
	if (forced)
		for (var ARRAY in TypedArrayConstructorsList) {
			var TypedArrayConstructor = global[ARRAY];
			if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY))
				try {
					delete TypedArrayConstructor.prototype[KEY];
				} catch (error) {
					// old WebKit bug - some methods are non-configurable
					try {
						TypedArrayConstructor.prototype[KEY] = property;
					} catch (error2) {
						/* empty */
					}
				}
		}
	if (!TypedArrayPrototype[KEY] || forced) {
		defineBuiltIn(TypedArrayPrototype, KEY, forced ? property : (NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY]) || property, options);
	}
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	var ARRAY, TypedArrayConstructor;
	if (!DESCRIPTORS) return;
	if (setPrototypeOf) {
		if (forced)
			for (ARRAY in TypedArrayConstructorsList) {
				TypedArrayConstructor = global[ARRAY];
				if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY))
					try {
						delete TypedArrayConstructor[KEY];
					} catch (error) {
						/* empty */
					}
			}
		if (!TypedArray[KEY] || forced) {
			// V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
			try {
				return defineBuiltIn(TypedArray, KEY, forced ? property : (NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY]) || property);
			} catch (error) {
				/* empty */
			}
		} else return;
	}
	for (ARRAY in TypedArrayConstructorsList) {
		TypedArrayConstructor = global[ARRAY];
		if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
			defineBuiltIn(TypedArrayConstructor, KEY, property);
		}
	}
};

for (NAME in TypedArrayConstructorsList) {
	Constructor = global[NAME];
	Prototype = Constructor && Constructor.prototype;
	if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
	Constructor = global[NAME];
	Prototype = Constructor && Constructor.prototype;
	if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
	// eslint-disable-next-line no-shadow -- safe
	TypedArray = function TypedArray() {
		throw TypeError("Incorrect invocation");
	};
	if (NATIVE_ARRAY_BUFFER_VIEWS)
		for (NAME in TypedArrayConstructorsList) {
			if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
		}
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
	TypedArrayPrototype = TypedArray.prototype;
	if (NATIVE_ARRAY_BUFFER_VIEWS)
		for (NAME in TypedArrayConstructorsList) {
			if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
		}
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
	TYPED_ARRAY_TAG_REQUIRED = true;
	definePropertyModule.f(TypedArrayPrototype, TO_STRING_TAG, {
		get: function () {
			return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
		},
	});
	for (NAME in TypedArrayConstructorsList)
		if (global[NAME]) {
			createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
		}
}

export const ArrayBufferViewCore = {
	NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
	aTypedArray: aTypedArray,
	aTypedArrayConstructor: aTypedArrayConstructor,
	exportTypedArrayMethod: exportTypedArrayMethod,
	exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	getTypedArrayConstructor: getTypedArrayConstructor,
	isView: isView,
	isTypedArray: isTypedArray,
	TypedArray: TypedArray,
	TypedArrayPrototype: TypedArrayPrototype,
};
