//Made by Mased
var screen = render.get_screen_size()
var lasttime = global_vars.realtime()
var notify = []
var anim = 0

function notify_func(x, y, w, h, color1, color2, rounding, timeout, moving, title, description){
    var lerp = function(a, b, percentage) { return a + (b - a) * percentage }
    anim = lerp(anim, moving, 2 * global_vars.frametime())
    notify.push([x, y], [w, h], color1, color2, rounding, title, description)

    if(lasttime + timeout < global_vars.realtime()){
        notify.shift() 
    } else {
        render.filled_rect([notify[0][0] - (255 * anim), 5 + description.length], [notify[1][0], notify[1][1]], notify[2], notify[4])
        render.text([notify[0][0] - (255 * anim) + 5, notify[0][1] + 14.5], color2, 12, 3, "</>")
        render.text([notify[0][0] - (255 * anim) + 50, notify[0][1] + 15], [255, 255, 255, 255], 5, 3, title)
        for(i in description){
            render.text([notify[0][0] - (255 * anim) + 8, notify[0][1] + 34 + (i * 12)], [255, 255, 255, 255], 12, 2, description[i])
        }
    }
}

register_callback("render", function(){
    notify_func(screen[0], 10, 250, 120, [40, 40, 40, 170], [216, 43, 255, 255], 3, 3, 1, "Welcome, Mased", [
        "That's example how that works", 
        cheat.get_username(), 
        "Функция не идеальная, возможны баги", 
        "Этого я считаю достаточно для начала", 
        "Soooooo *useful*"
    ])
})
