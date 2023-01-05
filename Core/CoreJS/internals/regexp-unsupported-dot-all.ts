import { fails } from "./fails";
import { global } from "./global";

export const UNSUPPORTED_DOT_ALL = fails(() => {
  const re = global.RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});