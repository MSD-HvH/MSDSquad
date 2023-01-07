import { NATIVE_WEAK_MAP } from "./weak-map-basic-detection";
import { global } from "./global";
import { isObject } from "./is-object";
import { createNonEnumerableProperty } from "./create-non-enumerable-property";
import { hasOwn } from "./has-own-property";
import { shared } from "./shared";
import { sharedKey } from "./shared-key";
import { hiddenKeys } from "./hidden-keys";

const OBJECT_ALREADY_INITIALIZED = "Object already initialized";
const TypeError = global.TypeError;
const WeakMap = global.WeakMap;
let set, get, has;

const enforce = function (it) {
	return has(it) ? get(it) : set(it, {});
};

const getterFor = function (TYPE) {
	return function (it) {
		var state;
		if (!isObject(it) || (state = get(it)).type !== TYPE) {
			throw TypeError("Incompatible receiver, " + TYPE + " required");
		}
		return state;
	};
};

if (NATIVE_WEAK_MAP || shared.state) {
	const store = shared.state || (shared.state = new WeakMap());
	/* eslint-disable no-self-assign -- prototype methods protection */
	store.get = store.get;
	store.has = store.has;
	store.set = store.set;
	/* eslint-enable no-self-assign -- prototype methods protection */
	set = function (it, metadata) {
		if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
		metadata.facade = it;
		store.set(it, metadata);
		return metadata;
	};
	get = function (it) {
		return store.get(it) || {};
	};
	has = function (it) {
		return store.has(it);
	};
} else {
	var STATE = sharedKey("state");
	hiddenKeys[STATE] = true;
	set = function (it, metadata) {
		if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
		metadata.facade = it;
		createNonEnumerableProperty(it, STATE, metadata);
		return metadata;
	};
	get = function (it) {
		return hasOwn(it, STATE) ? it[STATE] : {};
	};
	has = function (it) {
		return hasOwn(it, STATE);
	};
}

export const InternalStateModule = {
	set: set,
	get: get,
	has: has,
	enforce: enforce,
	getterFor: getterFor,
};
