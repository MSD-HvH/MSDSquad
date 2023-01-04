import { isPrototypeOf } from "./object-is-prototype-of";

export const anInstance = (it, Prototype) => {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};
