import { global } from "./global";

export const entryVirtual = (CONSTRUCTOR) => {
  return global[CONSTRUCTOR].prototype;
};