function CreateErrorHandler(fnCallback) {
    Duktape.errCreate = function(e) {
        if(!(e instanceof Error) || 'thrown' in e || !Object.isExtensible(e))
            return e;
        e = fnCallback(e);
        return e;
    }
}CreateErrorHandler(function(e) {
    e.time = new Date();
    Cheat.PrintChat("　\x0E" + "\x02 Whoops, looks like something went wrong. Please check your console.\n");
    Cheat.ExecuteCommand("playvol resource/warning.wav 100");
    Cheat.PrintColor([255, 0, 0, 255], "    \n" + e.name + ": " + e.message + " at line " + e.lineNumber + "\n\n");
    return e;
});
