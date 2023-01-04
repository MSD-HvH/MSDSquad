function draw_circle_3d(x, y, z, radius, degrees, start_at, clr, filled, fill_clr) {
    var accuracy = 10;
    var old_x, old_y;
    start_at = start_at+1
    for (rot=start_at; rot < degrees+start_at+1; rot+=accuracy) {
        rot_r = rot*(Math.PI/180)
        line_x = radius * Math.cos(rot_r) + x, line_y = radius * Math.sin(rot_r) + y
        var curr = Render.WorldToScreen([line_x, line_y, z]), cur = Render.WorldToScreen([x, y, z]);
        if (cur[0] != null && curr[0] != null && old_x != null) {
            if (filled) Render.Polygon([ [curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]] ], fill_clr)
            Render.Line(curr[0], curr[1], old_x, old_y, clr)
        }
        old_x = curr[0], old_y = curr[1];
    }
}

UI.AddColorPicker(["Visuals", "ESP", "Self"], "Halo Color")

function render() {
    var color = UI.GetColor(["Visuals", "ESP", "Self", "Halo Color"])
    var pos = Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 0)
    draw_circle_3d(pos[0], pos[1], pos[2] + 10, 5, 360, 0.150, color, false)
}

Global.RegisterCallback("Draw", "render");