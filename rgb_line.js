ui.add_slider("Heigth", "heigth", 3, 10)

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

function rainbowLine(){
    var c = HSVtoRGB(global_vars.realtime() * 0.4, 1, 1);
    var height = vars.get_uint("js.heigth")
    var ScreenSize = render.get_screen_size()

    render.filled_rect_gradient([0, 0], [ScreenSize[0] / 2, height], [c[2], c[1], c[0], 255], [c[0], c[1], c[2], 255], [c[0], c[1], c[2], 255], [c[2], c[1], c[0], 255])
    render.filled_rect_gradient([ScreenSize[0] / 2, 0], [ScreenSize[0], height], [c[0], c[1], c[2], 255], [c[1], c[0], c[2], 255], [c[1], c[0], c[2], 255], [c[0], c[1], c[2], 255])
}

register_callback("render", rainbowLine)
