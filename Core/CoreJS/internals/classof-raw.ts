import { uncurryThisRaw } from "./function-uncurry-this-raw";

const toString = uncurryThisRaw({}.toString);
const stringSlice = uncurryThisRaw("".slice);

export const classofRaw = (it) => {
	return stringSlice(toString(it), 8, -1);
};
