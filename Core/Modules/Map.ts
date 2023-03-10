/// <reference no-default-lib="true"/>

const global = Function('return this')();
let Symbol = global.Symbol;

if (!Symbol) {
	let idCounter: number = 0;

	Symbol = function Symbol <K extends string> (key: K) {
		return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + (++idCounter) + '__';
	};

	Symbol.iterator = Symbol('Symbol.iterator');
};

const hasOwn = Object.prototype.hasOwnProperty;

const KEY_MAP_ID: string = Symbol('mapId');
let mapIdCounter: number = 0;

const entryStub: { value: undefined } = {
    value: undefined
};

export class Map <K, V> {
    private _entries = Object.create(null);
    private _objectStamps = {};

    private _first = null;
    private _last = null;

    /**
     * @returns the number of elements in the Map.
     */
    public size: number = 0;

    constructor(entries = null) {
        if (entries) {
			for (var i = 0, l = entries.length; i < l; i++) {
				this.set(entries[i][0], entries[i][1]);
			}
		}
    };

    /**
     * @returns boolean indicating whether an element with the specified key exists or not.
     */
    public has = (key: K): boolean => {
        return !!this._entries[this._getValueStamp(key)];
    }

    /**
     * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
     * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
     */
    public get = (key: K): V | undefined => {
        return (this._entries[this._getValueStamp(key)] || entryStub).value;
    }

    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     */
    public set = (key: K, value: V): this => {
        var entries = this._entries;
        var keyStamp = this._getValueStamp(key);

        if (entries[keyStamp]) {
            entries[keyStamp].value = value;
        } else {
            var entry = entries[keyStamp] = {
                key: key,
                keyStamp: keyStamp,
                value: value,
                prev: this._last,
                next: null
            };

            if (this.size++) {
                this._last.next = entry;
            } else {
                this._first = entry;
            }

            this._last = entry;
        }

        return this;
    };

    /**
     * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    public delete = (key: K): boolean => {
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
    };

    public clear = (): void => {
        var entries = this._entries;

        for (var stamp in entries) {
            delete entries[stamp];
        }

        this._objectStamps = {};

        this._first = null;
        this._last = null;

        this.size = 0;
    };

    /**
     * Executes a provided function once per each key/value pair in the Map, in insertion order.
     */
    public forEach = (callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void => {
        var entry = this._first;

        while (entry) {
            callbackfn.call(thisArg, entry.value, entry.key, this);

            do {
                entry = entry.next;
            } while (entry && !this._entries[entry.keyStamp]);
        }
    };

    private toString = (): "[object Map]"  => {
        return "[object Map]";
    }

    private _getValueStamp = (value) => {
        switch (typeof value) {
            case 'undefined': {
                return 'undefined';
            }
            case 'object': {
                if (value === null) {
                    return 'null';
                }

                break;
            }
            case 'boolean': {
                return '?' + value;
            }
            case 'number': {
                return '+' + value;
            }
            case 'string': {
                return ',' + value;
            }
        }

        return this._getObjectStamp(value);
    };

    private _getObjectStamp = (obj) => {
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
                value: String(++mapIdCounter)
            });
        }

        return obj[KEY_MAP_ID];
    };
};