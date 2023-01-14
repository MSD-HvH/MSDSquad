import { uncurryThis } from "./function-uncurry-this";
import { fails } from "./fails";
import { isCallable } from "./is-callable";
import { classof } from "./classof";
import { getBuiltIn } from "./get-built-in";
import { inspectSource } from "./inspect-source";

const noop = () => { /* empty */ };
const empty = [];
const construct = getBuiltIn('Reflect', 'construct');
const constructorRegExp = /^\s*(?:class|function)\b/;
const exec = uncurryThis(constructorRegExp.exec);
const INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

export const isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

export const isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
export const isConstructor = !construct || fails(() => {
  let called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(() => called = true)
    || called;
}) ? isConstructorLegacy : isConstructorModern;
