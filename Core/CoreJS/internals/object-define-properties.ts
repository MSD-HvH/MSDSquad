import { DESCRIPTORS } from "./descriptors"
import { V8_PROTOTYPE_DEFINE_BUG } from "./v8-prototype-define-bug";
import { definePropertyModule } from "./object-define-property";
import { anObject } from "./an-object";
import { toIndexedObject } from "./to-indexed-object";
import { objectKeys } from "./object-keys";

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
export const definePropertiesModule = {
  f: DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
  }
}
