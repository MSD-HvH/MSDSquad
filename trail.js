var pos = []

function HSVtoRGB(h,s,v){
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
}

ui.add_slider("Trail Length", "length", 0, 1000)

function cm(){
    pos.unshift(entity.get_origin(entity.get_local_player()))
    if(pos.length > vars.get_uint("js.length")) { 
        pos.pop()
    }
}

function drawtrail(){
    var first = true
    
    var rgb = HSVtoRGB(global_vars.tick_count() % 350 / 350, 1, 1)

    var last = []
    if(pos.length < 1) { return }
    for(i in pos) {
        var w2s = render.world_to_screen(pos[i])
        if(!first)
        {
            //Cheat.Print([w2s,last] + "\n")
            render.line( [w2s[0], w2s[1]], [last[0], last[1]], [rgb[0], rgb[1], rgb[2], 255], 1)
        }
        first = false
        last = w2s
    }
}

function reset() {
    pos.length = 0
}

register_callback("round_end", reset)
register_callback("render", drawtrail)
register_callback("createmove", cm)