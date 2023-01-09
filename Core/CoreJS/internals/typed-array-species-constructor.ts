import { ArrayBufferViewCore } from "../internals/array-buffer-view-core";
import { speciesConstructor } from "./species-constructor";

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
export const typedArraySpeciesConstructor = function (originalArray) {
	return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor(originalArray)));
};
