const check = (it: any) => {
	return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
export const global =
	// eslint-disable-next-line es/no-global-this -- safe
	check(typeof globalThis == "object" && globalThis) ||
	check(typeof window == "object" && window) ||
	// eslint-disable-next-line no-restricted-globals -- safe
	check(typeof self == "object" && self) ||
	// @ts-ignore
	check(typeof global == "object" && global) ||
	// eslint-disable-next-line no-new-func -- fallback
	(function () {
		return this;
	})() ||
	Function("return this")();
