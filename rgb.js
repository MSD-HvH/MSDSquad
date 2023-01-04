//HSVtoRGB Спизженно с югейма, спасибо большое DarkLuny
function HSVtoRGB(h, s, v) { // i dont know who this belongs to but whoever it is i credit you :D
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function draw(){
    var origin = entity.get_origin(entity.get_local_player())
    var wts = render.world_to_screen(origin)
    var rgb = HSVtoRGB(global_vars.tick_count() % 350 / 350, 1, 1);
    render.circle([(wts[0] - 100), wts[1] - 50], 25, [rgb.r, rgb.g, rgb.b, 100], 50);
}

register_callback('render', draw);