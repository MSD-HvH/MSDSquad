var relink = require;
// @ts-ignore
var require = <I extends string> (id: I) => {
    return relink(`${id}.js`);
};

import { EventEmitter } from "./Core/Modules/EventEmitter";

const test = new EventEmitter();

test.emit("button");