'use strict';
import { global } from './global';
import { uncurryThis } from './function-uncurry-this';
import { DESCRIPTORS} from './descriptors';
import { NATIVE_ARRAY_BUFFER} from './array-buffer-basic-detection';
import { functionName } from './function-name';
import { createNonEnumerableProperty} from './create-non-enumerable-property';
import { defineBuiltIns} from './define-built-ins';
import { fails } from "./fails";
import { anInstance} from './an-instance';
import { toIntegerOrInfinity} from './to-integer-or-infinity';
import { toLength} from './to-length';
import { toIndex} from './to-index';
import { IEEE754} from './ieee754';
import { getPrototypeOf} from './object-get-prototype-of';
import { setPrototypeOf} from './object-set-prototype-of';
import { getOwnPropertyNamesModule } from './object-get-own-property-names';
import { definePropertyModule } from './object-define-property';
import { arrayFill} from './array-fill';
import { arraySlice} from './array-slice-simple';
import { setToStringTag} from './set-to-string-tag';
import { InternalStateModule} from './internal-state';

const PROPER_FUNCTION_NAME = functionName.PROPER;
const CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
const getInternalState = InternalStateModule.get;
const setInternalState = InternalStateModule.set;
const ARRAY_BUFFER = 'ArrayBuffer';
const DATA_VIEW = 'DataView';
const PROTOTYPE = 'prototype';
const WRONG_LENGTH = 'Wrong length';
const WRONG_INDEX = 'Wrong index';
const NativeArrayBuffer = global[ARRAY_BUFFER];
let $ArrayBuffer = NativeArrayBuffer;
let ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
let $DataView = global[DATA_VIEW];
let DataViewPrototype = $DataView && $DataView[PROTOTYPE];
const ObjectPrototype = Object.prototype;
const Array = global.Array;
const RangeError = global.RangeError;
const fill = uncurryThis(arrayFill);
const reverse = uncurryThis([].reverse);

const packIEEE754 = IEEE754.pack;
const unpackIEEE754 = IEEE754.unpack;

const packInt8 = function (number) {
  return [number & 0xFF];
};

const packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

const packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

const unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

const packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

const packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

const addGetter = function (Constructor, key) {
  definePropertyModule.f(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

const get = function (view, count, index, isLittleEndian?) {
  const intIndex = toIndex(index);
  const store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  const bytes = getInternalState(store.buffer).bytes;
  const start = intIndex + store.byteOffset;
  const pack = arraySlice(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

const set = function (view, count, index, conversion, value, isLittleEndian?) {
  const intIndex = toIndex(index);
  const store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  const bytes = getInternalState(store.buffer).bytes;
  const start = intIndex + store.byteOffset;
  const pack = conversion(+value);
  for (let i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    const byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    const bufferLength = getInternalState(buffer).byteLength;
    const offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  defineBuiltIns(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      const bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      const bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  const INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return NativeArrayBuffer.length != 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
    /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (let keys = getOwnPropertyNamesModule.f(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf(DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  const testView = new $DataView(new $ArrayBuffer(2));
  const $setInt8 = uncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};
