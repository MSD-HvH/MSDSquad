var screen = render.get_screen_size(); 
var anim = 0; //Made by Mased
lerp = function(start, end, time, do_extraanim) { if(!do_extraanim && Math.floor(start) == end) return end; time = global_vars.frametime() * (time * 175); if(time < 0) time = 0.01; else if(time > 1) time = 1; return (end - start) * time + start }
var binds = [
    ["doubletap", "double piu-piu", 0],
    ["hide_shots", "hide shots", 0],
    ["fake_duck", "duck peek assist", 0],
    ["slow_walk", "slow motion", 0],
    ["force_safepoints", "force safepoint", 0],
    ["body_aim", "force baim", 0],
    ["override_damage", "min dmg override", 0]
]

ui.add_slider("Width", "width", 150, 300)
ui.add_slider("Position x", "x", 5, screen[0]);
ui.add_slider("Position y", "y", 5, screen[1])

register_callback("render", function() {
    var x = vars.get_uint("js.x"), y = vars.get_uint("js.y"), width = vars.get_uint("js.width")
    var activeBinds = []

    render.line([x, y - 1], [x + width, y - 1], [170, 100, 255, 255], 2)
    render.filled_rect([x, y], [width, 15], [15, 15, 15, 255], 3)
    render.text([x + 5, y], [255, 255, 255, 255], 9, 1, "keybinds")
    
    for(i in binds) {
        if(vars.is_bind_active(binds[i][0])) { activeBinds.push([ binds[i][1], binds[i][2] ]); }
        binds[i][2] = lerp(binds[i][2], (activeBinds.length != 0 || ui.get_menu_alpha()) ? 255 : 0, 0.03)
    }

    for(var i = 0; i < activeBinds.length; i++) {
        render.text([x + 5, y + 17 * (activeBinds[i][1] / 255) + (12 * i)], [255, 255, 255, 255 * (activeBinds[i][1] / 255)], 1, 1, activeBinds[i][0])
        render.text([x + width - 50, y + 17 * (activeBinds[i][1] / 255) + (12 * i)], [255, 255, 255, 255 * (activeBinds[i][1] / 255)], 1, 1, "[ toggled ]" )
    }
})
