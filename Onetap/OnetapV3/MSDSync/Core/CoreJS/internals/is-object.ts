import { isCallable } from "./is-callable";
import $documentAll from "./document-all";

export const isObject = $documentAll.IS_HTMLDDA ? (it) => {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === $documentAll.all;
} : (it) => {
  return typeof it == 'object' ? it !== null : isCallable(it);
};
