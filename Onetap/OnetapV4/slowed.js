var color_mod = function(perc){var r = 124*2 - 124 * perc; var g = 195 * perc; var b = 13;return [r, g, b];}
var lerp = function(a, b, percentage) {return a + (b - a) * percentage}
function render_arc(x, y, radius, radius_inner, start_angle, end_angle, segments, color) {
    while(360 % segments != 0) {segments++}
    segments = 360 / segments;
    for(var i = start_angle; i < start_angle + end_angle; i = i + segments) {
        var rad = i * Math.PI / 180; var rad2 = (i + segments) * Math.PI / 180; var rad_cos = Math.cos(rad); var rad_sin = Math.sin(rad); var rad2_cos = Math.cos(rad2); var rad2_sin = Math.sin(rad2);
        var x1_outer = x + rad_cos * radius; var y1_outer = y + rad_sin * radius; var x2_outer = x + rad2_cos * radius; var y2_outer = y + rad2_sin * radius; var x1_inner = x + rad_cos * radius_inner; var y1_inner = y + rad_sin * radius_inner; var x2_inner = x + rad2_cos * radius_inner; var y2_inner = y + rad2_sin * radius_inner;
        Render.Polygon([[x1_outer, y1_outer], [x2_outer, y2_outer], [x1_inner, y1_inner]], color);
        Render.Polygon([[x1_inner, y1_inner], [x2_outer, y2_outer], [x2_inner, y2_inner]], color);
    }
}

var a_width = 0
function velocity() {
    var me = Entity.GetLocalPlayer()
    if (!Entity.IsAlive(me)) return
    var font = Render.GetFont("Montserrat-SemiBold.ttf", 10, true)
    var font2 = Render.GetFont("OnetapFont Regular.ttf", 19, true)

    var modifier = Entity.GetProp(me, "CCSPlayer", "m_flVelocityModifier")
    if (modifier == 1) return
    var color = color_mod(modifier)
    var text = Math.floor(modifier*100) + "%"
    var text_width = 95
    a_width = lerp(a_width, Math.floor((text_width - 2) * modifier), Globals.Frametime() * 8)

    var screen = Render.GetScreenSize()
    var x = screen[0]/2; var y = screen[1]/2 - 150

    Render.String(x + 10, y + 5, 0, text, [0, 0, 0, 255], font)
    Render.String(x + 9, y + 4, 0, text, [255, 255, 255, 255], font)

    Render.String(x + 11, y - 13, 0, "M", [0, 0, 0, 255], font2)
    Render.String(x + 10, y - 14, 0, "M", [255, 255, 255, 255], font2)

    render_arc(x + 18, y - 1, 31, 22, 0, 3.6 * Math.floor(modifier*100), 50, [0, 0, 0, 75])
    render_arc(x + 18, y - 1, 30, 23, 0, 3.6 * Math.floor(modifier*100), 50, [color[0], color[1], color[2], 255])
}

Cheat.RegisterCallback("Draw", "velocity")
