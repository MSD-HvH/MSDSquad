import { global } from "./global";
import { isCallable } from "./is-callable";

const WeakMap = global.WeakMap;

export const NATIVE_WEAK_MAP = isCallable(WeakMap) && /native code/.test(String(WeakMap));