import { fails } from "./fails";
import { global } from "./global";

export const UNSUPPORTED_NCG = fails(() => {
  const re = global.RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});