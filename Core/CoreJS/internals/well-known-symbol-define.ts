import { global as path } from "../internals/path";
import { hasOwn } from "../internals/has-own-property";
import { wrappedWellKnownSymbolModule } from "../internals/well-known-symbol-wrapped";
import { definePropertyModule } from "../internals/object-define-property";

export const defineWellKnownSymbol = function (NAME) {
	var Symbol = path.Symbol || (path.Symbol = {});
	if (!hasOwn(Symbol, NAME))
		definePropertyModule.f(Symbol, NAME, {
			value: wrappedWellKnownSymbolModule.f(NAME),
		});
};
