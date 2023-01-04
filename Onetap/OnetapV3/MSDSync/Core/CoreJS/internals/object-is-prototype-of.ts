import { uncurryThis } from "./function-uncurry-this";

export const isPrototypeOf = uncurryThis({}.isPrototypeOf);