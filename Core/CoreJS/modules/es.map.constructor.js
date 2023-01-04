'use strict';
var collection = require('../internals/collection.js');
var collectionStrong = require('../internals/collection-strong.js');

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects

exports.Map = collection('Map', function (init) {
  return function Map() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong);