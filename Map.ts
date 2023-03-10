const global = Function('return this')();
let Symbol = global.Symbol;

if (!Symbol) {
	let idCounter: number = 0;

	Symbol = function Symbol <K extends string> (key: K) {
		return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + (++idCounter) + '__';
	};

	Symbol.iterator = Symbol('Symbol.iterator');
};

var hasOwn = Object.prototype.hasOwnProperty;

var KEY_MAP_ID = Symbol('mapId');
var mapIdCounter = 0;

var entryStub = {
    value: undefined
};

class Map {
    _entries = Object.create(null);
    _objectStamps = {};

    _first = null;
    _last = null;

    size = 0;

    constructor(entries = null) {
        if (entries) {
			for (var i = 0, l = entries.length; i < l; i++) {
				this.set(entries[i][0], entries[i][1]);
			}
		}
    };

    has = (key) => {
        return !!this._entries[this._getValueStamp(key)];
    }

    get = (key) => {
        return (this._entries[this._getValueStamp(key)] || entryStub).value;
    }

    set = (key, value) => {
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

    delete = (key) => {
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

    clear = () => {
        var entries = this._entries;

        for (var stamp in entries) {
            delete entries[stamp];
        }

        this._objectStamps = {};

        this._first = null;
        this._last = null;

        this.size = 0;
    };

    forEach = (callback, context?) => {
        var entry = this._first;

        while (entry) {
            callback.call(context, entry.value, entry.key, this);

            do {
                entry = entry.next;
            } while (entry && !this._entries[entry.keyStamp]);
        }
    };

    toString = () => {
        return '[object Map]';
    }

    _getValueStamp = (value) => {
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

    _getObjectStamp = (obj) => {
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

const test = new Map();

test.set("hello", "world");
test.forEach((value, key, context) => {
    Cheat.Print("\n" + key + " " + value + "\n");
});

Cheat.Print(test.get("hello"));