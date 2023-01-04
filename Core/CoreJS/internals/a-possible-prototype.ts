import { isCallable } from "./is-callable";

export const aPossiblePrototype = (argument: any): any => {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};
