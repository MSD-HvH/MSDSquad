import { wellKnownSymbol } from "./well-known-symbol.js";

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

export const TO_STRING_TAG_SUPPORT = String(test) === '[object z]';