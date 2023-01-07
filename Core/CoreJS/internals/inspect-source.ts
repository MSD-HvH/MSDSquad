import { uncurryThis } from "./function-uncurry-this";
import { isCallable } from "./is-callable";
import { store } from "./shared-store";

const functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
	store.inspectSource = (it) => {
		return functionToString(it);
	};
}

export const inspectSource = store.inspectSource;
