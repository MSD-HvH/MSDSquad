var screen = Render.GetScreenSize()
var Lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var CursorBox = function(mouse_pos, x, y, x2, y2) { return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) }
var data = new Object
var cache = [0, 0]; var drg = 0
var anim = 0

UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Spectator List")
UI.AddSliderInt(["Visuals", "Spectator List", "Spectator List"], "Spectator List | Position X", 1, screen[0])
UI.AddSliderInt(["Visuals", "Spectator List", "Spectator List"], "Spectator List | Position Y", 1, screen[0])
UI.AddColorPicker(["Visuals", "Spectator List", "Spectator List"], "Spectator List | Color"); UI.SetColor(["Visuals", "Spectator List", "Spectator List", "Spectator List | Color"], [180, 180, 255, 255])

function Render_StringShadow(x, y, centered, text, color, font) {
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, 255 * (anim / 255)], font)
    Render.String(x, y, centered, text, color, font)
}

function Drag(pos, x, y, x2, y2) {
    if(Input.IsKeyPressed(0x01)) {
        if(CursorBox(pos, x, y, x2, y2) && drg == 0) {
            cache[0] = x - pos[0]
            cache[1] = y - pos[1]
            drg = 1
        }
    }
    if (!Input.IsKeyPressed(0x01)) drg = 0
    if(UI.IsMenuOpen() > 0 && drg == 1) {
        UI.SetValue(["Visuals", "Spectator List", "Spectator List", "Spectator List | Position X"], pos[0] + cache[0])
        UI.SetValue(["Visuals", "Spectator List", "Spectator List", "Spectator List | Position Y"], pos[1] + cache[1])
    }
}

function get_spectators() {
    var specs = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")
            if (obs === Entity.GetLocalPlayer()) {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }

    return specs;
}

function on_draw() {
    var x = UI.GetValue(["Visuals", "Spectator List", "Spectator List", "Spectator List | Position X"])
    var y = UI.GetValue(["Visuals", "Spectator List", "Spectator List", "Spectator List | Position Y"])
    var Color = UI.GetColor(["Visuals", "Spectator List", "Spectator List", "Spectator List | Color"])
    var font = Render.GetFont("Verdanab.ttf", 9, true); font2 = Render.GetFont("Verdana.ttf", 9, true)
    var size = [160, 17]
    var specsList = get_spectators()

    Render.FilledRect(x, y + 2, size[0], size[1], [0, 0, 0, 200 * (anim / 255)])
    Render.FilledRect(x, y, size[0], 2, [Color[0], Color[1], Color[2], Color[3] * (anim / 255)])
    Render_StringShadow(x + 5, y + 3, 0, "spectator List", [255, 255, 255, 255 * (anim / 255)], font)

    for(i = 0; i < specsList.length; i++) {
        Render.FilledRect(x, y + 20 + (14 * i), 12, 12, [20, 20, 20, 255]);
        Render.String(x + 5, y + 20 + (14 * i), 1, "?", [255, 255, 255, 255 / 1.3], font2);
        Render_StringShadow(x + 15, y + 20 + (14 * i), 0, specsList[i], [255, 255, 255, 255 * (anim / 255)], font)
    }

    anim = Lerp(anim, (specsList.length != 0 || UI.IsMenuOpen()) ? 255 : 0, 0.2)

    Drag(Input.GetCursorPosition(), x, y, x + size[0], y + size[1])
}

Cheat.RegisterCallback("Draw", "on_draw")
