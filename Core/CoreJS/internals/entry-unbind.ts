import { global } from "./global";
import { uncurryThis } from "./function-uncurry-this";

export const entryUnbind = (CONSTRUCTOR, METHOD) => {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};
