ui.add_slider("x", "x", 0, 100)
ui.add_slider("y", "y", 0, 100)

var weapons = {
    1: [11, 38],
    2: [40],
    3: [9],
    4: [7, 8, 10, 13, 39, 60],
    5: [2, 3, 4, 30, 32, 36, 61, 63],
    6: [1, 64]
}

register_callback("render", function() {
    if(!vars.get_bool("ragebot.enable")) return
    var screen = render.get_screen_size()
    var x = screen[0] / 2 - 50
    var y = screen[1] / 2 - 50

    function check() { 
        if(vars.is_bind_active("override_damage")) { return "mindamage_override" } else { return "mindamage" }
    }

    for(i in weapons) {
        for(j in weapons[i]) {
            if(entity.get_weapon_id(entity.get_local_player()) == weapons[i][j]) {
                render.text([x + vars.get_uint("js.x"), y + vars.get_uint("js.y")], [255, 255, 255, 255], 7, 2, vars.get_int("ragebot.weapons[" + i + "]." + check()).toString())
                return
            }
        }
    }

    render.text([x + vars.get_uint("js.x"), y + vars.get_uint("js.y")], [255, 255, 255, 255], 7, 2, vars.get_int("ragebot.weapons[0]." + check()).toString())
})
