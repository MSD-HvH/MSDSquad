import { global } from "./global";

export const defineGlobalProperty = (key, value) => {
  try {
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};
