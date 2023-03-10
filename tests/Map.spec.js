var Map_js_1 = require("../Core/Modules/Map.js");
var test = new Map_js_1.Map();

test.set("hello", "world");
test.set("hello 1", "world 1");

Cheat.Print("\n");

Cheat.Print("key 'hello' is valid: " + test.has("hello") + "\n")
Cheat.Print(Object.keys(test._entries).join("\n"));

Cheat.Print("\n");