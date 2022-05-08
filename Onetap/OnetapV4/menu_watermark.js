var Lerp = function(a, b, percentage) { return a + (b - a) * percentage; }
var x = 0;
var y = 0;

function on_draw() { 
    if(!UI.IsMenuOpen()) return
    var time = new Date().toTimeString().substring(0, 5);
    var menu = UI.GetMenuPosition()
    var font = Render.GetFont("Verdana.ttf", 12, true)

    x = Lerp(x, menu[0], Globals.Frametime() * 6); 
    y = Lerp(y, menu[1], Globals.Frametime() * 6)

    Render.FilledRect(x, y - 40, menu[2], 25, [33, 33, 38, 255])
    Render.Rect(x, y - 40, menu[2], 25, [250, 166, 24, 255])

    Render.String(x + 11, y - 35, 0, "Welcome back, " + Cheat.GetUsername(), [0, 0, 0, 255], font)
    Render.String(x + 10, y - 36, 0, "Welcome back, " + Cheat.GetUsername(), [255, 255, 255, 255], font)

    Render.String(x + menu[2] - 44, y - 35, 0, time, [0, 0, 0, 255], font)
    Render.String(x + menu[2] - 45, y - 36, 0, time, [255, 255, 255, 255], font)


    Render.Line(x, y - 15, menu[0], menu[1], [255, 255, 255, 175])
    Render.Line(x + menu[2], y - 15, menu[0] + menu[2], menu[1], [255, 255, 255, 175])
}

Cheat.RegisterCallback("Draw", "on_draw")
