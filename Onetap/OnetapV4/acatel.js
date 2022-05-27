var Lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var Render_StringShadow = function(x, y, centered, text, color, font) {
    Render.String(x - 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x - 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x, y, centered, text, color, font)
}
var screen = Render.GetScreenSize();
var animation = 0;

function on_render() {
    var x = (screen[0] / 2) - 10; var y = (screen[1] / 2) + 15;
    var font = Render.GetFont("smallest_pixel-7.ttf", 10, true);
    var isScoped = Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_bIsScoped");
    var isDT = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"]);
    var isOS = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"]);
    var isBaim = UI.GetValue(["Rage", "General", "General", "Key assignment", "Force body aim"])
    var isSF = UI.GetValue(["Rage", "General", "General", "Key assignment", "Force safe point"])
    var isInverter = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA direction inverter"]);
    animation = Lerp(animation, isScoped ? 256 : 0, 0.3)

    Render_StringShadow(x + 30 * (animation / 255), y, 1, "Acatel", [255, 255, 255, 255], font)
    Render_StringShadow(x + Render.TextSize("Acatel", font)[0] + 30 * (animation / 255), y, 1, "Beta",  [145, 85, 101, 255], font)

    Render_StringShadow(x + 9 + 30 * (animation / 254), y + 10, 1, "FAKE YAW: ",  [145, 85, 101, 255], font)
    Render_StringShadow(x + (Render.TextSize("FAKE YAW:", font)[0] - 8) + 30 * (animation / 255), y + 10, 1, isInverter ? "R" : "L",  [255, 255, 255, 255], font)

    Render_StringShadow((x - 10) + 30 * (animation / 255), y + 20, 1, "DT", isDT ? [255, 255, 255, 255] : [255, 255, 255, 100], font)
    Render_StringShadow((x + 5) + 30 * (animation / 255), y + 20, 1, "OS", isOS ? [255, 255, 255, 255] : [255, 255, 255, 100], font)
    Render_StringShadow((x + 20) + 30 * (animation / 255), y + 20, 1, "BM", isBaim ? [255, 255, 255, 255] : [255, 255, 255, 100], font)
    Render_StringShadow((x + 35) + 30 * (animation / 255), y + 20, 1, "FS", isSF ? [255, 255, 255, 255] : [255, 255, 255, 100], font)
}

Cheat.RegisterCallback("Draw", "on_render")
