exports.Lerp = function(a, b, percentage) { 
    return a + (b - a) * percentage 
}

exports.CursorBox = function(mouse_pos, x, y, x2, y2) { 
    return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) 
}

exports.Clamp = function(val, min, max) {
    if (val > max) return max
    if (min > val) return min
    return val  
}

exports.SetDropdownValue = function(value, index, enable) {
    var mask = 1 << index;
    return enable ? (value | mask) : (value &~ mask)
}

exports.Random = function(min, max) { 
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min 
}

exports.HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
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
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

exports.RGBtoHSV = function(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b) 
    var min = Math.min(r, g, b)
    d = max - min, h, s = (max === 0 ? 0 : d / max),
    v = max / 255
    switch (max) {
        case min: 
            h = 0; 
        break;
        
        case r: 
            h = (g - b) + d * (g < b ? 6: 0); 
            h /= 6 * d; 
        break;
        
        case g: 
            h = (b - r) + d * 2; 
            h /= 6 * d; 
        break;
        
        case b: 
            h = (r - g) + d * 4; 
            h /= 6 * d; 
        break;
    };
    
    return {h: h,s: s,v: v}
}

exports.Arc = function(x, y, radius, start_angle, percent, thickness, color) {
    var precision = (2 * Math.PI) / 30;
    var step = Math.PI / 180;
    var inner = radius - thickness;
    var end_angle = (start_angle + percent) * step;
    var start_angle = (start_angle * Math.PI) / 180;
    for (; radius > inner; --radius) {
        for (var angle = start_angle; angle < end_angle; angle += precision) {
            var cx = Math.round(x + radius * Math.cos(angle));
            var cy = Math.round(y + radius * Math.sin(angle));
            var cx2 = Math.round(x + radius * Math.cos(angle + precision));
            var cy2 = Math.round(y + radius * Math.sin(angle + precision));
            Render.Line(cx, cy, cx2, cy2, color);
        }
    }
}

/**
 * 
 * @param {Number} x Position x
 * @param {Number} y position y
 * @param {Number=} centered Text should be centered
 * @param {String} text Text to render
 * @param {[red: Number, green: Number, blue: Number, alpha: Number]} color Text color
 * @param {Render.GetFont} font https://docs.onecrack.shop/onecrack-api/render#getfont
 */
exports.StringShadow = function(x, y, centered, text, color, font) {
    Render.String(x - 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x - 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x, y, centered, text, color, font)
}

/**
 * @param {Number} x Position x
 * @param {Number} y Position y
 * @param {Number=} centered Text should be centered
 * @param {[text: String, color: Array(red: Number, green: Number, blue: Number, alpha: number)][]} text Array of arrays with text information
 * @param {Render.GetFont} font https://docs.onecrack.shop/onecrack-api/render#getfont
 * @param {Number} slice Line spacing
 * @param {Boolean=} shadow Text should have shadow
 * 
 * @example
 * ```
    const useful = require("useful.js")
    const text = [
        ["Missed", [255, 255, 255, 255]],
        ["Mased", [255, 46, 46, 255]],
        ["in the", [255, 255, 255, 255]],
        ["neck", [255, 46, 46, 255]],
        ["due to", [255, 255, 255, 255]],
        ["resolver", [255, 46, 46, 255]]
    ]


    function on_draw() {
        const font = Render.GetFont("Verdana.ttf", 11, true);
        useful.multi_colored_text(500, 100, 0, text, font, 5, true)
    }

    Cheat.RegisterCallback("Draw", "on_draw")
 * ```
 */
exports.multi_colored_text = function(x, y, centered, text, font, slice, shadow) {
    text.forEach(function(string, i) {
        if(string[0].startsWith("\n")) y += Render.TextSize(string[0], font)[1] + slice

        if(shadow) Render.String(x + 1, y + 1, centered || 0, string[0], [0, 0, 0, string[1][3]], font)
        Render.String(x, y, centered || 0, string[0], string[1], font)

        x += Render.TextSize(string[0], font)[0] + slice
    })
}

exports.OutLineCorner = function(x, y, w, h, size1, size2, color) {
    Render.Line(x - 2, y - 2, x + w - 2, y - 2, color)
    Render.Line(x - 2, y - 2, x - 2, y + h - 2, color)

    Render.Line(x + size1 - w + 1, y - 2, x + size1 + 1 , y - 2, color)
    Render.Line(x + size1 + 1, y - 2, x + size1 + 1, y + h - 2, color)

    Render.Line(x - 2, y + size2 + 1, x + w - 2, y + size2 + 1, color)
    Render.Line(x - 2, y + size2 + 1, x - 2, y + size2 - h + 1, color)

    Render.Line(x + size1 - w + 1, y + size2 + 1, x + size1 + 1, y + size2 + 1, color)
    Render.Line(x + size1 + 1, y + size2 + 1, x + size1 + 1, y + size2 - h + 1, color)
}

exports.GamesenseUI = function(x, y, w, h) {
    Render.FilledRect(x - 6, y - 6, w + 13, h + 14, [0, 0, 0, 255]);
    Render.FilledRect(x - 5, y - 5, w + 11, h + 12, [34, 34, 34, 255]);
    Render.FilledRect(x + 1, y, w, h + 1, [0, 0, 0, 255]);
    Render.Rect(x - 1, y - 1, w + 3, h + 3, [56, 56, 56, 255]);
    Render.Rect(x - 5, y - 5, w + 11, h + 12, [56, 56, 56, 255]);
}
