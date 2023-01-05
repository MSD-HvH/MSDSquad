import { shared } from "./shared";
import { uid } from "./uid";

const keys = shared('keys');

export const sharedKey = (key) => {
  return keys[key] || (keys[key] = uid(key));
};