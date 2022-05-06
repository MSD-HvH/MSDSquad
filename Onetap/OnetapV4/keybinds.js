var screen = Render.GetScreenSize()
var Lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var data = new Object
var anim = 0
var binds = [
    [["Rage", "Exploits", "Keys", "Key assignment", "Double tap"], "double piu piu"],
    [["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"], "on-shot assist"],
    [["Rage", "General", "Key assignment", "Force body aim"], "force baim"],
    [["Rage", "General", "Key assignment", "Force safe point"], "force safe point"],
    [["Rage", "General", "Key assignment", "Damage override"], "minimum damage"],
    [["Rage", "General", "Key assignment", "Hitbox override"], "hitbox override"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Left direction"], "manual left"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Back direction"], "manual back"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Right direction"], "manual right"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Mouse direction"], "mouse direction"],
    [["Rage", "Anti Aim", "General", "Key assignment", "AA direction inverter"], "AA inverter"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Slow walk"], "slow motion"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Fake duck"], "duck peek assist"],
    [["Misc.", "Keys", "Keys", "Key assignment", "Edge jump"], "e-jump assits"],
    [["Misc.", "Keys", "Keys", "Key assignment", "Auto peek"], "quick peek"],
    [["Misc.", "Keys", "Keys", "Key assignment", "Thirdperson"], "3-rd person"]
]

UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Keybinds")
UI.AddSliderInt(["Visuals", "Keybinds", "Keybinds"], "Keybinds | Position X", 1, screen[0])
UI.AddSliderInt(["Visuals", "Keybinds", "Keybinds"], "Keybinds | Position Y", 1, screen[0])
UI.AddColorPicker(["Visuals", "Keybinds", "Keybinds"], "Keybinds | Color")

for(var i in binds) {
    data[binds[i][1]] = {
        name: binds[i][1],
        path: binds[i][0],
        anim: 0
    }
}

function Render_StringShadow(x, y, centered, text, color, font) {
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, 255 * (anim / 255)], font)
    Render.String(x, y, centered, text, color, font)
}

function on_draw() {
    var x = UI.GetValue(["Visuals", "Keybinds", "Keybinds", "Keybinds | Position X"])
    var y = UI.GetValue(["Visuals", "Keybinds", "Keybinds", "Keybinds | Position Y"])
    var Color = UI.GetColor(["Visuals", "Keybinds", "Keybinds", "Keybinds | Color"])
    var font = Render.GetFont("Verdanab.ttf", 9, true)
    var masterActive = new Array

    Render.FilledRect(x, y + 2, 140, 17, [0, 0, 0, 200 * (anim / 255)])
    Render.FilledRect(x, y, 140, 2, [Color[0], Color[1], Color[2], Color[3] * (anim / 255)])
    Render_StringShadow(x + 5, y + 3, 0, "keybinds", [255, 255, 255, 255 * (anim / 255)], font)

    for(var i in data) {
        data[i].anim = Lerp(data[i].anim, (UI.GetValue(data[i].path) || UI.IsMenuOpen()) ? 255 : 0.00, 0.2)
        if(UI.GetValue(data[i].path)) {
            masterActive.push(data[i])
        }
    }

    for(i = 0; i < masterActive.length; i++) {
        Render_StringShadow(x + 5, y + 20 + (12 * i) * (masterActive[i].anim / 255), 0, masterActive[i].name, [255, 255, 255, 255 * (masterActive[i].anim / 255)], font)
        //render.text([x + width - 50, y + 17 * (masterActive[i].anim / 255) + (13 * i)], [255, 255, 255, 255 * (masterActive[i].anim / 255)], 1, 1, "[ toggled ]" )
    }

    anim = Lerp(anim, (masterActive.length != 0 || UI.IsMenuOpen()) ? 255 : 0.00, 0.2)
}

Cheat.RegisterCallback("Draw", "on_draw")
