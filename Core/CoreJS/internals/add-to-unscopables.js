import wellKnownSymbol from "./well-known-symbol";
import create from "./object-create";
import defineProperty from "./object-define-property";

const UNSCOPABLES = wellKnownSymbol('unscopables');

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (Array.prototype[UNSCOPABLES] == undefined) {
  defineProperty(Array.prototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
export const addToUnsopables = (key: any): any => {
  Array.prototype[UNSCOPABLES][key] = true;
};
