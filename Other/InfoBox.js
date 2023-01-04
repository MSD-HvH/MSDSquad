var screen = Render.GetScreenSize()
var a = 0
var Lerp = function(a, b, percentage) { return a + (b - a) * percentage; }
UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "InfoBox")
UI.AddSliderInt(["Visuals", "InfoBox", "InfoBox"], "InfoBox | Position X", 1, screen[0])
UI.AddSliderInt(["Visuals", "InfoBox", "InfoBox"], "InfoBox | Position Y", 1, screen[0])
function on_draw() {
    
    a = Lerp(a, 1, Globals.Frametime() * 8)
    var alpha = Math.floor(Math.sin(Globals.Realtime() * 3) * (200 / 2) + 200 / 2)
    var x = UI.GetValue(["Visuals", "InfoBox", "InfoBox", "InfoBox | Position X"])
    var y = UI.GetValue(["Visuals", "InfoBox", "InfoBox", "InfoBox | Position Y"])
    var desync = Local.GetFakeYaw()
    var info = Cheat.GetUsername()
    var user = (info == undefined ? "User" : (info.length > 15 ? info.slice(0, info.length - 12) + "..." : info + ""))
    var check = (UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"]) ? " | DT" : UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"]) ? " | OS" : "")
    var font = Render.GetFont("Verdanab.ttf", 8, true)

    function Render_StringShadow(x, y, centered, text, color, font) {
        Render.String(x + 1, y + 1, centered, text, [0, 0, 0, 255], font)
        Render.String(x, y, centered, text, color, font)
    }

    Render.FilledRect(x, y, 120, 50, [20, 20, 20, 95])
    Render.Rect(x, y, 120, 50, [255, 255, 255, a * alpha])
    Render_StringShadow(x + 8, y + 6, 0, ">> $ MSD Company $", [255, 255, 255, 255], font)
    Render_StringShadow(x + 8, y + 20, 0, ">> Welcome, " + user, [255, 255, 255, 255], font)
    Render_StringShadow(x + 8, y + 34, 0, ">> Build: Beta | " + desync + check, [255, 255, 255, 255], font)
}

Cheat.RegisterCallback("Draw", "on_draw")
