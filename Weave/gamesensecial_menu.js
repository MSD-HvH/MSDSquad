var x = 200
var y = 200
var width = 197
var height = 200
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

register_callback("render", function() {
    color = HSVtoRGB(global_vars.tick_count() % 350 / 350, 1, 1);
    var size = ui.get_menu_size()
    var pos = ui.get_menu_position()
    //main
    render.filled_rect([pos[0] - 10, pos[1] - 20], [size[0] + 20, size[1] + 30], [ 4, 4, 4, 255 ], 3); // black
    render.rect([pos[0] - 10, pos[1] - 20], [size[0] + 20, size[1] + 30], [ 56, 56, 56, 255 ], 3); // white

    render.line([pos[0] - 5, pos[1] - 15], [pos[0] + size[0] + 10, pos[1] - 15], [color[0], color[1], color[2], 255], 3)

    render.rect([pos[0] - 10, pos[1] - 20], [size[0] + 21, size[1] + 31], [ 34, 34, 34, 255 ], 0);
    render.rect([pos[0] - 9, pos[1] - 19], [size[0] + 19, size[1] + 30], [ 34, 34, 34, 255 ], 0);
    render.rect([pos[0] - 8, pos[1] - 18], [size[0] + 17, size[1] + 28], [ 34, 34, 34, 255 ], 0);
    render.rect([pos[0] - 7, pos[1] - 17], [size[0] + 15, size[1] + 26], [ 56, 56, 56, 255 ], 0);
    render.rect([pos[0] - 6, pos[1] - 16], [size[0] + 13, size[1] + 24], [ 4, 4, 4, 255 ], 0);
    render.rect([pos[0] - 11, pos[1] - 21], [size[0] + 22, size[1] + 32], [ 56, 56, 56, 255 ], 0);
    render.rect([pos[0] - 12, pos[1] - 22], [size[0] + 23, size[1] + 33], [ 34, 34, 34, 255 ], 0);
})

