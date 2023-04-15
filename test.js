var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
var global = Function("return this;")();
var Symbol = global.Symbol;
if (!Symbol) {
    var idCounter = 0;
    Symbol = function Symbol(key) {
        return "__" + key + "_" + Math.floor(Math.random() * 1e9) + "_" + ++idCounter + "__";
    };
    Symbol.iterator = Symbol("Symbol.iterator");
}
(typeof module != "undefined" ? exports : global).Symbol = Symbol;
var Map = global.Map;
if (!Map || Map.toString().indexOf("[native code]") == -1 || !new Map([[1, 1]]).size) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var KEY_MAP_ID = Symbol("mapId");
    var mapIdCounter = 0;
    var entryStub = {
        value: undefined,
    };
    Map = function Map(entries) {
        this._entries = Object.create(null);
        this._objectStamps = {};
        this._first = null;
        this._last = null;
        this.size = 0;
        if (entries) {
            for (var i = 0, l = entries.length; i < l; i++) {
                this.set(entries[i][0], entries[i][1]);
            }
        }
    };
    Map.prototype = {
        constructor: Map,
        has: function (key) {
            return !!this._entries[this._getValueStamp(key)];
        },
        get: function (key) {
            return (this._entries[this._getValueStamp(key)] || entryStub).value;
        },
        set: function (key, value) {
            var entries = this._entries;
            var keyStamp = this._getValueStamp(key);
            if (entries[keyStamp]) {
                entries[keyStamp].value = value;
            } else {
                var entry = (entries[keyStamp] = {
                    key: key,
                    keyStamp: keyStamp,
                    value: value,
                    prev: this._last,
                    next: null,
                });
                if (this.size++) {
                    this._last.next = entry;
                } else {
                    this._first = entry;
                }
                this._last = entry;
            }
            return this;
        },
        delete: function (key) {
            var keyStamp = this._getValueStamp(key);
            var entry = this._entries[keyStamp];
            if (!entry) {
                return false;
            }
            if (--this.size) {
                var prev = entry.prev;
                var next = entry.next;
                if (prev) {
                    prev.next = next;
                } else {
                    this._first = next;
                }
                if (next) {
                    next.prev = prev;
                } else {
                    this._last = prev;
                }
            } else {
                this._first = null;
                this._last = null;
            }
            delete this._entries[keyStamp];
            delete this._objectStamps[keyStamp];
            return true;
        },
        clear: function () {
            var entries = this._entries;
            for (var stamp in entries) {
                delete entries[stamp];
            }
            this._objectStamps = {};
            this._first = null;
            this._last = null;
            this.size = 0;
        },
        forEach: function (callback, context) {
            var entry = this._first;
            while (entry) {
                callback.call(context, entry.value, entry.key, this);
                do {
                    entry = entry.next;
                } while (entry && !this._entries[entry.keyStamp]);
            }
        },
        toString: function () {
            return "[object Map]";
        },
        _getValueStamp: function (value) {
            switch (typeof value) {
                case "undefined": {
                    return "undefined";
                }
                case "object": {
                    if (value === null) {
                        return "null";
                    }
                    break;
                }
                case "boolean": {
                    return "?" + value;
                }
                case "number": {
                    return "+" + value;
                }
                case "string": {
                    return "," + value;
                }
            }
            return this._getObjectStamp(value);
        },
        _getObjectStamp: function (obj) {
            if (!hasOwn.call(obj, KEY_MAP_ID)) {
                if (!Object.isExtensible(obj)) {
                    var stamps = this._objectStamps;
                    var stamp;
                    for (stamp in stamps) {
                        if (hasOwn.call(stamps, stamp) && stamps[stamp] == obj) {
                            return stamp;
                        }
                    }
                    stamp = String(++mapIdCounter);
                    stamps[stamp] = obj;
                    return stamp;
                }
                Object.defineProperty(obj, KEY_MAP_ID, {
                    value: String(++mapIdCounter),
                });
            }
            return obj[KEY_MAP_ID];
        },
    };
    [
        [
            "keys",
            function (entry) {
                return entry.key;
            },
        ],
        [
            "values",
            function (entry) {
                return entry.value;
            },
        ],
        [
            "entries",
            function (entry) {
                return [entry.key, entry.value];
            },
        ],
    ].forEach(function (settings) {
        var getStepValue = settings[1];
        Map.prototype[settings[0]] = function () {
            var entries = this._entries;
            var entry;
            var done = false;
            var map = this;
            return {
                next: function () {
                    if (!done) {
                        if (entry) {
                            do {
                                entry = entry.next;
                            } while (entry && !entries[entry.keyStamp]);
                        } else {
                            entry = map._first;
                        }
                        if (entry) {
                            return {
                                value: getStepValue(entry),
                                done: false,
                            };
                        }
                        done = true;
                    }
                    return {
                        value: undefined,
                        done: true,
                    };
                },
            };
        };
    });
}
if (!Map.prototype[Symbol.iterator]) {
    Map.prototype[Symbol.iterator] = Map.prototype.entries;
}
/**
 * A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has
 * an ID, for significantly improved performance and ease-of-use.
 *
 * @typeParam K - The key type this collection holds
 * @typeParam V - The value type this collection holds
 */
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    /**
     * Obtains the value of the given key if it exists, otherwise sets and returns the value provided by the default value generator.
     *
     * @param key - The key to get if it exists, or set otherwise
     * @param defaultValueGenerator - A function that generates the default value
     * @example
     * ```ts
     * collection.ensure(guildId, () => defaultGuildConfig);
     * ```
     */
    Collection.prototype.ensure = function (key, defaultValueGenerator) {
        if (this.has(key)) return this.get(key);
        if (typeof defaultValueGenerator !== "function") throw new TypeError("".concat(defaultValueGenerator, " is not a function"));
        var defaultValue = defaultValueGenerator(key, this);
        this.set(key, defaultValue);
        return defaultValue;
    };
    /**
     * Checks if all of the elements exist in the collection.
     *
     * @param keys - The keys of the elements to check for
     * @returns `true` if all of the elements exist, `false` if at least one does not exist.
     */
    Collection.prototype.hasAll = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return keys.every(function (key) {
            return _super.prototype.has.call(_this, key);
        });
    };
    /**
     * Checks if any of the elements exist in the collection.
     *
     * @param keys - The keys of the elements to check for
     * @returns `true` if any of the elements exist, `false` if none exist.
     */
    Collection.prototype.hasAny = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return keys.some(function (key) {
            return _super.prototype.has.call(_this, key);
        });
    };
    Collection.prototype.first = function (amount) {
        if (amount === undefined) return this.values().next().value;
        if (amount < 0) return this.last(amount * -1);
        amount = Math.min(this.size, amount);
        var iter = this.values();
        return Array.from({ length: amount }, function () {
            return iter.next().value;
        });
    };
    Collection.prototype.firstKey = function (amount) {
        if (amount === undefined) return this.keys().next().value;
        if (amount < 0) return this.lastKey(amount * -1);
        amount = Math.min(this.size, amount);
        var iter = this.keys();
        return Array.from({ length: amount }, function () {
            return iter.next().value;
        });
    };
    Collection.prototype.last = function (amount) {
        var arr = __spreadArray([], this.values(), true);
        if (amount === undefined) return arr[arr.length - 1];
        if (amount < 0) return this.first(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    };
    Collection.prototype.lastKey = function (amount) {
        var arr = __spreadArray([], this.keys(), true);
        if (amount === undefined) return arr[arr.length - 1];
        if (amount < 0) return this.firstKey(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    };
    Collection.prototype.random = function (amount) {
        var arr = __spreadArray([], this.values(), true);
        if (amount === undefined) return arr[Math.floor(Math.random() * arr.length)];
        if (!arr.length || !amount) return [];
        return Array.from({ length: Math.min(amount, arr.length) }, function () {
            return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
        });
    };
    Collection.prototype.randomKey = function (amount) {
        var arr = __spreadArray([], this.keys(), true);
        if (amount === undefined) return arr[Math.floor(Math.random() * arr.length)];
        if (!arr.length || !amount) return [];
        return Array.from({ length: Math.min(amount, arr.length) }, function () {
            return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
        });
    };
    /**
     * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse | Array.reverse()}
     * but returns a Collection instead of an Array.
     */
    Collection.prototype.reverse = function () {
        var entries = __spreadArray([], this.entries(), true).reverse();
        this.clear();
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var _a = entries_1[_i],
                key = _a[0],
                value = _a[1];
            this.set(key, value);
        }
        return this;
    };
    Collection.prototype.find = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (fn(val, key, this)) return val;
        }
        return undefined;
    };
    Collection.prototype.findKey = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (fn(val, key, this)) return key;
        }
        return undefined;
    };
    Collection.prototype.sweep = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        var previousSize = this.size;
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (fn(val, key, this)) this.delete(key);
        }
        return previousSize - this.size;
    };
    Collection.prototype.filter = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        var results = new this.constructor[Symbol.species]();
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (fn(val, key, this)) results.set(key, val);
        }
        return results;
    };
    Collection.prototype.partition = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        var results = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (fn(val, key, this)) {
                results[0].set(key, val);
            } else {
                results[1].set(key, val);
            }
        }
        return results;
    };
    Collection.prototype.flatMap = function (fn, thisArg) {
        var _a;
        // eslint-disable-next-line unicorn/no-array-method-this-argument
        var collections = this.map(fn, thisArg);
        return (_a = new this.constructor[Symbol.species]()).concat.apply(_a, collections);
    };
    Collection.prototype.map = function (fn, thisArg) {
        var _this = this;
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        var iter = this.entries();
        return Array.from({ length: this.size }, function () {
            var _a = iter.next().value,
                key = _a[0],
                value = _a[1];
            return fn(value, key, _this);
        });
    };
    Collection.prototype.mapValues = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        var coll = new this.constructor[Symbol.species]();
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            coll.set(key, fn(val, key, this));
        }
        return coll;
    };
    Collection.prototype.some = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (fn(val, key, this)) return true;
        }
        return false;
    };
    Collection.prototype.every = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                val = _b[1];
            if (!fn(val, key, this)) return false;
        }
        return true;
    };
    /**
     * Applies a function to produce a single value. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce | Array.reduce()}.
     *
     * @param fn - Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentKey`,
     * and `collection`
     * @param initialValue - Starting value for the accumulator
     * @example
     * ```ts
     * collection.reduce((acc, guild) => acc + guild.memberCount, 0);
     * ```
     */
    Collection.prototype.reduce = function (fn, initialValue) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        var accumulator;
        if (initialValue !== undefined) {
            accumulator = initialValue;
            for (var _i = 0, _a = this; _i < _a.length; _i++) {
                var _b = _a[_i],
                    key = _b[0],
                    val = _b[1];
                accumulator = fn(accumulator, val, key, this);
            }
            return accumulator;
        }
        var first = true;
        for (var _c = 0, _d = this; _c < _d.length; _c++) {
            var _e = _d[_c],
                key = _e[0],
                val = _e[1];
            if (first) {
                accumulator = val;
                first = false;
                continue;
            }
            accumulator = fn(accumulator, val, key, this);
        }
        // No items iterated.
        if (first) {
            throw new TypeError("Reduce of empty collection with no initial value");
        }
        return accumulator;
    };
    Collection.prototype.each = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                value = _b[1];
            fn(value, key, this);
        }
        return this;
    };
    Collection.prototype.tap = function (fn, thisArg) {
        if (typeof fn !== "function") throw new TypeError("".concat(fn, " is not a function"));
        if (thisArg !== undefined) fn = fn.bind(thisArg);
        fn(this);
        return this;
    };
    /**
     * Creates an identical shallow copy of this collection.
     *
     * @example
     * ```ts
     * const newColl = someColl.clone();
     * ```
     */
    Collection.prototype.clone = function () {
        return new this.constructor[Symbol.species](this);
    };
    /**
     * Combines this collection with others into a new collection. None of the source collections are modified.
     *
     * @param collections - Collections to merge
     * @example
     * ```ts
     * const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     * ```
     */
    Collection.prototype.concat = function () {
        var collections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            collections[_i] = arguments[_i];
        }
        var newColl = this.clone();
        for (var _a = 0, collections_1 = collections; _a < collections_1.length; _a++) {
            var coll = collections_1[_a];
            for (var _b = 0, coll_1 = coll; _b < coll_1.length; _b++) {
                var _c = coll_1[_b],
                    key = _c[0],
                    val = _c[1];
                newColl.set(key, val);
            }
        }
        return newColl;
    };
    /**
     * Checks if this collection shares identical items with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     *
     * @param collection - Collection to compare with
     * @returns Whether the collections have identical contents
     */
    Collection.prototype.equals = function (collection) {
        if (!collection) return false; // runtime check
        if (this === collection) return true;
        if (this.size !== collection.size) return false;
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                value = _b[1];
            if (!collection.has(key) || value !== collection.get(key)) {
                return false;
            }
        }
        return true;
    };
    /**
     * The sort method sorts the items of a collection in place and returns it.
     * The sort is not necessarily stable in Node 10 or older.
     * The default sort order is according to string Unicode code points.
     *
     * @param compareFunction - Specifies a function that defines the sort order.
     * If omitted, the collection is sorted according to each character's Unicode code point value, according to the string conversion of each element.
     * @example
     * ```ts
     * collection.sort((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
     * ```
     */
    Collection.prototype.sort = function (compareFunction) {
        if (compareFunction === void 0) {
            compareFunction = Collection.defaultSort;
        }
        var entries = __spreadArray([], this.entries(), true);
        entries.sort(function (a, b) {
            return compareFunction(a[1], b[1], a[0], b[0]);
        });
        // Perform clean-up
        _super.prototype.clear.call(this);
        // Set the new entries
        for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
            var _a = entries_2[_i],
                key = _a[0],
                value = _a[1];
            _super.prototype.set.call(this, key, value);
        }
        return this;
    };
    /**
     * The intersect method returns a new structure containing items where the keys and values are present in both original structures.
     *
     * @param other - The other Collection to filter against
     */
    Collection.prototype.intersect = function (other) {
        var coll = new this.constructor[Symbol.species]();
        for (var _i = 0, other_1 = other; _i < other_1.length; _i++) {
            var _a = other_1[_i],
                key = _a[0],
                value = _a[1];
            if (this.has(key) && Object.is(value, this.get(key))) {
                coll.set(key, value);
            }
        }
        return coll;
    };
    /**
     * The subtract method returns a new structure containing items where the keys and values of the original structure are not present in the other.
     *
     * @param other - The other Collection to filter against
     */
    Collection.prototype.subtract = function (other) {
        var coll = new this.constructor[Symbol.species]();
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                value = _b[1];
            if (!other.has(key) || !Object.is(value, other.get(key))) {
                coll.set(key, value);
            }
        }
        return coll;
    };
    /**
     * The difference method returns a new structure containing items where the key is present in one of the original structures but not the other.
     *
     * @param other - The other Collection to filter against
     */
    Collection.prototype.difference = function (other) {
        var coll = new this.constructor[Symbol.species]();
        for (var _i = 0, other_2 = other; _i < other_2.length; _i++) {
            var _a = other_2[_i],
                key = _a[0],
                value = _a[1];
            if (!this.has(key)) coll.set(key, value);
        }
        for (var _b = 0, _c = this; _b < _c.length; _b++) {
            var _d = _c[_b],
                key = _d[0],
                value = _d[1];
            if (!other.has(key)) coll.set(key, value);
        }
        return coll;
    };
    /**
     * Merges two Collections together into a new Collection.
     *
     * @param other - The other Collection to merge with
     * @param whenInSelf - Function getting the result if the entry only exists in this Collection
     * @param whenInOther - Function getting the result if the entry only exists in the other Collection
     * @param whenInBoth - Function getting the result if the entry exists in both Collections
     * @example
     * ```ts
     * // Sums up the entries in two collections.
     * coll.merge(
     *  other,
     *  x => ({ keep: true, value: x }),
     *  y => ({ keep: true, value: y }),
     *  (x, y) => ({ keep: true, value: x + y }),
     * );
     * ```
     * @example
     * ```ts
     * // Intersects two collections in a left-biased manner.
     * coll.merge(
     *  other,
     *  x => ({ keep: false }),
     *  y => ({ keep: false }),
     *  (x, _) => ({ keep: true, value: x }),
     * );
     * ```
     */
    Collection.prototype.merge = function (other, whenInSelf, whenInOther, whenInBoth) {
        var coll = new this.constructor[Symbol.species]();
        var keys = new Set(__spreadArray(__spreadArray([], this.keys(), true), other.keys(), true));
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var hasInSelf = this.has(key);
            var hasInOther = other.has(key);
            if (hasInSelf && hasInOther) {
                var result = whenInBoth(this.get(key), other.get(key), key);
                if (result.keep) coll.set(key, result.value);
            } else if (hasInSelf) {
                var result = whenInSelf(this.get(key), key);
                if (result.keep) coll.set(key, result.value);
            } else if (hasInOther) {
                var result = whenInOther(other.get(key), key);
                if (result.keep) coll.set(key, result.value);
            }
        }
        return coll;
    };
    /**
     * The sorted method sorts the items of a collection and returns it.
     * The sort is not necessarily stable in Node 10 or older.
     * The default sort order is according to string Unicode code points.
     *
     * @param compareFunction - Specifies a function that defines the sort order.
     * If omitted, the collection is sorted according to each character's Unicode code point value,
     * according to the string conversion of each element.
     * @example
     * ```ts
     * collection.sorted((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
     * ```
     */
    Collection.prototype.sorted = function (compareFunction) {
        if (compareFunction === void 0) {
            compareFunction = Collection.defaultSort;
        }
        return new this.constructor[Symbol.species](this).sort(function (av, bv, ak, bk) {
            return compareFunction(av, bv, ak, bk);
        });
    };
    Collection.prototype.toJSON = function () {
        // toJSON is called recursively by JSON.stringify.
        return __spreadArray([], this.values(), true);
    };
    Collection.defaultSort = function (firstValue, secondValue) {
        return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
    };
    /**
     * Creates a Collection from a list of entries.
     *
     * @param entries - The list of entries
     * @param combine - Function to combine an existing entry with a new one
     * @example
     * ```ts
     * Collection.combineEntries([["a", 1], ["b", 2], ["a", 2]], (x, y) => x + y);
     * // returns Collection { "a" => 3, "b" => 2 }
     * ```
     */
    Collection.combineEntries = function (entries, combine) {
        var coll = new Collection();
        for (var _i = 0, entries_3 = entries; _i < entries_3.length; _i++) {
            var _a = entries_3[_i],
                key = _a[0],
                value = _a[1];
            if (coll.has(key)) {
                coll.set(key, combine(coll.get(key), value, key));
            } else {
                coll.set(key, value);
            }
        }
        return coll;
    };
    return Collection;
})(Map);

const test = new Collection();
