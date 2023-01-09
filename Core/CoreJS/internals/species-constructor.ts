import { anObject } from "../internals/an-object";
import { aConstructor } from "../internals/a-constructor";
import { isNullOrUndefined } from "../internals/is-null-or-undefined";
import { wellKnownSymbol } from "../internals/well-known-symbol";

var SPECIES = wellKnownSymbol("species");

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
export const speciesConstructor = function (O, defaultConstructor) {
	var C = anObject(O).constructor;
	var S;
	return C === undefined || isNullOrUndefined((S = anObject(C)[SPECIES])) ? defaultConstructor : aConstructor(S);
};
