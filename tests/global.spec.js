const global = new Function("return this")();

Cheat.Print("\n" + Object.keys(global).join("\n") + "\n");