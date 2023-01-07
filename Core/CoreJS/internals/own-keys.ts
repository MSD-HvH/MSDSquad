import { getBuiltIn } from "./get-built-in";
import { uncurryThis } from "./function-uncurry-this";
import { getOwnPropertyNamesModule } from "./object-get-own-property-names";
import { getOwnPropertySymbolsModule } from "./object-get-own-property-symbols";
import { anObject } from "./an-object";

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
export const ownKeys =
	getBuiltIn("Reflect", "ownKeys") ||
	function ownKeys(it) {
		var keys = getOwnPropertyNamesModule.f(anObject(it));
		var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
		return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};
