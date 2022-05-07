var Lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var anim = 0

UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Watermark")
UI.AddColorPicker(["Visuals", "Watermark", "Watermark"], "Watermark | Color"); UI.SetColor(["Visuals", "Watermark", "Watermark", "Watermark | Color"], [180, 180, 255, 255])
UI.AddMultiDropdown(["Visuals", "Watermark", "Watermark"], "Watermark | Options", ["Custom Name", "Name", "Time", "Tickrate", "FPS"], 0)
UI.AddTextbox(["Visuals", "Watermark", "Watermark"], "Custom Cheat Name")

function Render_StringShadow(x, y, centered, text, color, font) {
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, 255], font)
    Render.String(x, y, centered, text, color, font)
}

function on_draw() {
    var combo = UI.GetValue(["Visuals", "Watermark", "Watermark", "Watermark | Options"])
    var Color = UI.GetColor(["Visuals", "Watermark", "Watermark", "Watermark | Color"])
    var font = Render.GetFont("Verdanab.ttf", 9, true)
    var screen = Render.GetScreenSize();

    combo & (1 << 0) ? UI.SetEnabled(["Visuals", "Watermark", "Watermark", "Custom Cheat Name"], 1) : UI.SetEnabled(["Visuals", "Watermark", "Watermark", "Custom Cheat Name"], 0)

    var cheatName = combo & (1 << 0) ? UI.GetString(["Visuals", "Watermark", "Watermark", "Custom Cheat Name"]) : "MSDSquad.Dev"
    var name = combo & (1 << 1) ? " | " + Cheat.GetUsername() : ""
    var time = combo & (1 << 2) ? " | " + new Date().toTimeString().substring(0, 5) : ""
    var serverTickrate = combo & (1 << 3) ? " | " + Globals.Tickrate() + " ticks" : ""
    var fps = combo & (1 << 4) ? " | " + Math.floor(1 / Global.Frametime()) + " fps" : ""
    var text = cheatName + name + time + serverTickrate + fps;
    anim = Lerp(anim, 254, 0.1)

    var textSize = Render.TextSize(text, font)[0] + 10

    Render.FilledRect(screen[0] - 10 - textSize * (anim / 255), 15, textSize, 17, [0, 0, 0, 200])
    Render.FilledRect(screen[0] - 10 - textSize * (anim / 255), 15, textSize, 2, [Color[0], Color[1], Color[2], Color[3]])
    Render_StringShadow(screen[0] - 5 - textSize * (anim / 255), 17, 0, text, [255, 255, 255, 255], font)
}

Cheat.RegisterCallback("Draw", "on_draw")
