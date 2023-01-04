import $documentAll from "./document-all";

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
export const isCallable = $documentAll.IS_HTMLDDA ? (argument) => {
  return typeof argument == 'function' || argument === $documentAll.all;
} : (argument) => {
  return typeof argument == 'function';
};
