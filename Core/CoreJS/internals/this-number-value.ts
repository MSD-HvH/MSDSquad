import { uncurryThis } from "./function-uncurry-this";

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
export const thisNumberValue = uncurryThis(1.0.valueOf);