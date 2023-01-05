import { global } from "./global";
import { defineGlobalProperty } from "./define-global-property";

const SHARED = '__core-js_shared__';
export const store = global[SHARED] || defineGlobalProperty(SHARED, {});