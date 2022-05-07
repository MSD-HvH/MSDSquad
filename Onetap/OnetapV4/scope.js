UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Custom Scope")
UI.AddColorPicker(["Visuals", "Custom Scope", "Custom Scope"], "Custom Scope | Color 1")
UI.AddColorPicker(["Visuals", "Custom Scope", "Custom Scope"], "Custom Scope | Color 2")
UI.AddSliderInt(["Visuals", "Custom Scope", "Custom Scope"], "Custom Scope | Width", 0, 800)
UI.AddSliderInt(["Visuals", "Custom Scope", "Custom Scope"], "Custom Scope | Offset", 0, 40)

var Lerp = function(a, b, percentage) { return a + (b - a) * percentage };
var anim = 0;
var screen = Render.GetScreenSize();

function on_draw() {
    var col1 = UI.GetColor(["Visuals", "Custom Scope", "Custom Scope", "Custom Scope | Color 1"])
    var col2 = UI.GetColor(["Visuals", "Custom Scope", "Custom Scope", "Custom Scope | Color 2"])
    var width = UI.GetValue(["Visuals", "Custom Scope", "Custom Scope", "Custom Scope | Width"])
    var offset = UI.GetValue(["Visuals", "Custom Scope", "Custom Scope", "Custom Scope | Offset"])
    var local = Entity.GetLocalPlayer();
    var IsScoped = Entity.GetProp(local, "CCSPlayer", "m_bIsScoped");

    if(!Entity.IsValid(local)) return

    anim = Lerp(anim, IsScoped ? 255 : 0, 0.1)

    if(IsScoped) {
        Convar.SetFloat("cl_draw_only_deathnotices", 1);

        Render.GradientRect(screen[0] / 2 + offset, screen[1] / 2, width * (anim / 255), 1, 1, [col1[0], col1[1], col1[2], col1[3]], [col2[0], col2[1], col2[2], col2[3]]);
        Render.GradientRect(screen[0] / 2 - width - offset, screen[1] / 2, width * (anim / 255), 1, 1, [col2[0], col2[1], col2[2], col2[3]], [col1[0], col1[1], col1[2], col1[3]]);
        Render.GradientRect(screen[0] / 2, screen[1] / 2 + offset, 1, width * (anim / 255), 0, [col1[0], col1[1], col1[2], col1[3]], [col2[0], col2[1], col2[2], col2[3]]);
        Render.GradientRect(screen[0] / 2, screen[1] / 2 - width - offset, 1, width * (anim / 255), 0, [col2[0], col2[1], col2[2], col2[3]], [col1[0], col1[1], col1[2], col1[3]]);
    } else {
        Convar.SetFloat("cl_draw_only_deathnotices", 0);
    }
}

Cheat.RegisterCallback("Draw", "on_draw")
