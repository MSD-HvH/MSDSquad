(function CreateErrorHandler(fnCallback) {
	Duktape.errCreate = function (e) {
		if (!(e instanceof Error) || 'thrown' in e || !Object.isExtensible(e)) return e;
		e = fnCallback(e);
		return e;
	}
})(function (e) {
	e.time = new Date();
	cheat.log("Found error in the script code, please send next message to the developer: \n");
	cheat.print_to_console("Information for the developer: error at line " + (e.lineNumber - 20) + "\n\n", [44, 3, 252]);
	return e;
});
