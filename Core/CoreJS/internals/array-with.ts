import { lengthOfArrayLike } from "./length-of-array-like";
import { toIntegerOrInfinity } from "./to-integer-or-infinity";

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
export const arrayWith = function (O, C, index, value) {
	const len = lengthOfArrayLike(O);
	const relativeIndex = toIntegerOrInfinity(index);
	const actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
	if (actualIndex >= len || actualIndex < 0) throw RangeError("Incorrect index");
	const A = new C(len);
	let k = 0;
	for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
	return A;
};
