var anim = 0
//Made by Mased
register_callback("render", function() { 
    var a = ui.get_menu_alpha()

    if (a > 0) {
        var lerp = function(a, b, percentage) { return a + (b - a) * percentage }
        anim = lerp(anim, 1, 0.5 * global_vars.frametime())
        var pos = ui.get_menu_position()
        var size = ui.get_menu_size()
        var hours = new Date().getHours()
        var minutes = new Date().getMinutes()

        render.filled_rect([pos[0] + 20 * anim, pos[1] - 70 * anim], [size[0], 40], [16,16,16, a * 255], 4)
        render.rect([pos[0] + 20 * anim, pos[1] - 70 * anim], [size[0], 40], [23, 98, 219, a * 255], 4)
        render.text([pos[0] + 10 + 20 * anim, pos[1] + 20 - 70 * anim], [255, 255, 255, a * 255], 12, 3, "Welcome back, Mased")
        render.text([pos[0] + size[0] - 60 + 20 * anim, pos[1] + 20 - 70 * anim], [255, 255, 255, a * 255], 12, 3, hours + ":" + minutes)

        render.line([pos[0], pos[1]], [pos[0] + 20 * anim, pos[1] + 38 - (70 * anim)], [255, 255, 255, a * 255], 1)
        render.line([pos[0] + size[0], pos[1]], [pos[0] - 1 + 20 * anim + size[0], pos[1] + 38 - (70 * anim)], [255, 255, 255, a * 255], 1)

    } else { return }

})
