'use strict';
import { getBuiltIn } from './get-built-in';
import { bind } from './function-bind-context';
import { uncurryThis } from './function-uncurry-this';
import { IndexedObject } from './indexed-object';
import { toObject } from './to-object';
import { lengthOfArrayLike } from './length-of-array-like';

const Map = getBuiltIn('Map');
const MapPrototype = Map.prototype;
const mapGet = uncurryThis(MapPrototype.get);
const mapHas = uncurryThis(MapPrototype.has);
const mapSet = uncurryThis(MapPrototype.set);
const push = uncurryThis([].push);

// `Array.prototype.groupToMap` method
// https://github.com/tc39/proposal-array-grouping
export const groupToMap = function (callbackfn /* , thisArg */) {
  const O = toObject(this);
  const self = IndexedObject(O);
  const boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  const map = new Map();
  const length = lengthOfArrayLike(self);
  let index = 0;
  let key, value;
  for (;length > index; index++) {
    value = self[index];
    key = boundFunction(value, index, O);
    if (mapHas(map, key)) push(mapGet(map, key), value);
    else mapSet(map, key, [value]);
  } return map;
};
