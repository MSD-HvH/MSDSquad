ui.add_slider("Count of snowflakes", "cofs", 30, 300)
var countsnowflakes = vars.get_int("js.cofs")
var background_alpha = 0
var snowflake_alpha = 0
var screen = render.get_screen_size();
function clamp(min, max, val){
    if (val > max) { 
        return max 
    } else {
        return min
    }
}

function draw_snowflake(x, y, size){
    var base = 4 + size
    render.line([(x - base), (y - base)], [(x + base + 1), (y + base + 1)], [255, 255, 255, snowflake_alpha - 75], 1)
    render.line([(x + base), (y - base)], [(x - base), (y + base)], [255, 255, 255, snowflake_alpha - 75], 1)
    base = 5 + size
    render.line([(x - base), y], [(x + base + 1), y], [255, 255, 255, snowflake_alpha - 75], 1)
    render.line([x, (y - base)], [x, (y + base + 1)], [255, 255, 255, snowflake_alpha - 75], 1)
}

var snowflakes = []
var time = 0
var stored_time = 0

function on_render(){
    background_alpha = clamp(0, 255, background_alpha + 10)
    snowflake_alpha = clamp(0, 255, snowflake_alpha + 10)
    background_alpha = clamp(0, 255, background_alpha - 10)
    snowflake_alpha = clamp(0, 255, snowflake_alpha - 10)
    snowflake_alpha = 255
    var frametime = global_vars.frametime()
    time = time + frametime

    if (snowflakes.length < vars.get_int("js.cofs")) {
        if(time > frametime){
        stored_time = time
        snowflakes.splice(vars.get_int("js.cofs"), math.random_int(1, snowflakes.length), [math.random_int(10, (screen[0] - 10)), 1, math.random_int(1, 3), (math.random_int(-60, 60) / 100), math.random_int(-3, 0)])  
        }
    } else {
        snowflakes.splice(snowflakes.length - snowflakes.length + 1, (vars.get_int("js.cofs")/2 - 10))
    }

    var fps = 1 / frametime

    for (i = 1; i < snowflakes.length; i++){
        var x = snowflakes[i][0]
        var y = snowflakes[i][1]
        var vspeed = snowflakes[i][2]
        var hspeed = snowflakes[i][3]
        var size = snowflakes[i][4]

        if(screen[1] <= y){
            snowflakes[i][0] = math.random_int(10, (screen[0] - 10))
            snowflakes[i][1] = 1
            snowflakes[i][2] = math.random_int(1, 3)
            snowflakes[i][3] = math.random_int(-60, 60) / 100
            snowflakes[i][4] = math.random_int(-3, 0)
        }

        draw_snowflake(x, y, size) 
        snowflakes[i][1] = snowflakes[i][1] + vspeed / fps * 200
        snowflakes[i][0] = snowflakes[i][0] + hspeed / fps * 200
    }
}
register_callback("render", on_render)