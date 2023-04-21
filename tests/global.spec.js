const global = new Function("return this")();

Cheat.Print("\n\n---------- Global Tests ----------\n");

Cheat.Print("\nglobal objects: \n - " + Object.keys(global).join("\n - ") + "\n\n");
Cheat.Print("__filename is: " + __filename + "\n");
Cheat.Print("performance.now() is: " + performance.now() + "\n");

Cheat.Print("\n---------- Global Tests End ----------\n\n");
