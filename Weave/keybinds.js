var screen = render.get_screen_size(); 
var anim = 0; //Made by Mased
var lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var binds = [
    ["doubletap", "double piu-piu"],
    ["hide_shots", "hide shots"],
    ["fake_duck", "duck peek assist"],
    ["slow_walk", "slow motion"],
    ["force_safepoints", "force safepoint"],
    ["body_aim", "force baim"],
    ["override_damage", "min dmg override"]
]

ui.add_slider("Width", "width", 150, 300)
ui.add_slider("Position x", "x", 5, screen[0]);
ui.add_slider("Position y", "y", 5, screen[1])

register_callback("render", function() {
    var x = vars.get_uint("js.x"), y = vars.get_uint("js.y"), width = vars.get_uint("js.width")
    var activeBinds = []
    anim = lerp(anim, 1, 2 * global_vars.frametime())

    render.line([x, y - 1], [x + width * anim, y - 1], [170, 100, 255, 255 * anim], 2)
    render.filled_rect([x, y], [width * anim, 15], [15, 15, 15, 255 * anim], 3)
    render.text([x + 5, y], [255, 255, 255, 255 * anim], 9, 1, "keybinds")
    
    for(i in binds) {
        if(vars.is_bind_active(binds[i][0])) { activeBinds.push(binds[i][1]); }
    }

    for(var i = 0; i < activeBinds.length; i++) {
        render.text([x + 5, y + 17 + (12 * i) * anim], [255, 255, 255, 255 * anim], 1, 1, activeBinds[i])
        render.text([x + width - 50, y + 17 + (12 * i) * anim], [255, 255, 255, 255 * anim], 1, 1, "[ toggled ] " )
    }
})
