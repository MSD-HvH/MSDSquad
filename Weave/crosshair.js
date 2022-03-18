var DEG2RAD = function(x){
    return x * 3.1415926535 / 180
}
var RAD2DEG = function(x){
    return x * 180 / 3.1415926535
}

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

var rainbow = 0.00
var rotationdegree = 0.000

ui.add_slider("Rainbow Speed", "rainbow_speed", 1, 500)
ui.add_slider("Crosshair Speed", "crosshair_speed", 0, 10)
ui.add_checkbox("Rainbow", "rainbow")
ui.add_slider("Crosshair Size", "crosshair_size", 5, 100)
var draw_svaston = function (x, y, size){
    var frametime = global_vars.frametime()
    var a = vars.get_uint("js.crosshair_size") //size / 60
    var gamma = Math.atan(a / a)

    tickcount = global_vars.tick_count();
    color = HSVtoRGB(global_vars.tick_count() % 350 / 350, 1, 1);

    function isRainbow() { if(vars.get_bool("js.rainbow")) { return [color[0], color[1], color[2], 255] } else { return [255, 255, 255, 255] }}

    for(i = 0; i <= 4; i++){
        var p_0 = (a * Math.sin(DEG2RAD(rotationdegree + (i * 90))))
        var p_1 = (a * Math.cos(DEG2RAD(rotationdegree + (i * 90))))
        var p_2 =((a / Math.cos(gamma)) * Math.sin(DEG2RAD(rotationdegree + (i * 90) + RAD2DEG(gamma))))
        var p_3 =((a / Math.cos(gamma)) * Math.cos(DEG2RAD(rotationdegree + (i * 90) + RAD2DEG(gamma))))

    
        render.line( [x, y], [x + p_0, y - p_1], isRainbow(), 1);
        render.line( [x + p_0, y - p_1], [x + p_2, y - p_3], isRainbow(), 1 );
    }
    rotationdegree = rotationdegree + vars.get_uint("js.crosshair_speed")
}

var screen_size = render.get_screen_size()
function clantag(){ //? Clantag??
    draw_svaston(screen_size[0] / 2, screen_size[1] / 2, screen_size[1] / 2)
}
register_callback("render", clantag);

convars.set_int("crosshair", 0);