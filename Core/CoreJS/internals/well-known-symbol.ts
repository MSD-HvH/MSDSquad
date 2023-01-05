import { global } from "./global";
import { shared } from "./shared";
import { hasOwn } from "./has-own-property";
import { uid } from "./uid";
import { NATIVE_SYMBOL } from "./symbol-constructor-detection";
import { USE_SYMBOL_AS_UID } from "./use-symbol-as-uid";

const WellKnownSymbolsStore = shared('wks');
const Symbol = global.Symbol;
const symbolFor = Symbol && Symbol['for'];
const createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

export const wellKnownSymbol = (name: string) => {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    const description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};