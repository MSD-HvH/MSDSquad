var anim = 0
//Made by Mased
register_callback("render", function() { 
    if (ui.get_menu_alpha() > 0) {
        lerp = function(start, end, time, do_extraanim) { if(!do_extraanim && Math.floor(start) == end) return end; time = global_vars.frametime() * (time * 175); if(time < 0) time = 0.01; else if(time > 1) time = 1; return (end - start) * time + start }
        anim = lerp(anim, ui.get_menu_alpha() ? 255 : 0, 0.03)
        var pos = ui.get_menu_position()
        var size = ui.get_menu_size()
        var hours = new Date().getHours()
        var minutes = new Date().getMinutes()

        render.filled_rect([pos[0] + 20 * (anim / 255), pos[1] - 70 * (anim / 255)], [size[0], 40], [16,16,16, 255* (anim / 255)], 4)
        render.rect([pos[0] + 20 * (anim / 255), pos[1] - 70 * (anim / 255)], [size[0], 40], [23, 98, 219, 255 * (anim / 255)], 4)
        render.text([pos[0] + 10 + 20 * (anim / 255), pos[1] + 20 - 70 * (anim / 255)], [255, 255, 255, 255 * (anim / 255)], 12, 3, "Welcome back, Mased")
        render.text([pos[0] + size[0] - 60 + 20 * (anim / 255), pos[1] + 20 - 70 * (anim / 255)], [255, 255, 255, 255 * (anim / 255)], 12, 3, hours + ":" + minutes)

        render.line([pos[0], pos[1]], [pos[0] + 20 * (anim / 255), pos[1] + 38 - (70 * (anim / 255))], [255, 255, 255, 255 * (anim / 255)], 1)
        render.line([pos[0] + size[0], pos[1]], [pos[0] - 1 + 20 * (anim / 255) + size[0], pos[1] + 38 - (70 * (anim / 255))], [255, 255, 255, 255 * (anim / 255)], 1)

    } else { return }

})
