/** @author Mased | @version 1.0.7 */

/** @author dermagister | @link https://yougame.biz/magister | @link https://yougame.biz/threads/221305 */
const throw_error = function(method, string) {
    Cheat.PrintChat("\x0E" + "\x02 Whoops, looks like something went wrong. Please check your console.\n");
    Cheat.ExecuteCommand("playvol resource/warning.wav 100");
    return Cheat.PrintColor([255, 0, 0, 255], "\nuseful.js \n - " + method + ": " + string + "\n");
}

const Vec3D = function(xx, yy, zz) {
    this.x = xx;
    this.y = yy;
    this.z = zz;
    this.length2d = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    this.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    this.normalize = function(){
        var l = this.length();
        if (l != 0.0) this /= l;
		else this.x = this.y = this.z = 0.0;
		return l;
    }
    this.distto = function(vec){
        var delta = new Vec3D;

        delta.x = this.x - vec.x;
        delta.y = this.y - vec.y;
        delta.z = this.z - vec.z;

        return delta.length();
    }
    this.toArray = function(){
        return [this.x, this.y, this.z];
    }
    this.clamp = function(){
        if (this.x < -89.0) this.x = -89.0;
		if (this.x > 89.0) this.x = 89.0;
		while (this.y < -180.0) this.y += 360.0;
		while (this.y > 180.0)
        this.y -= 360.0;

		this.z = 0.0;
		return this;
    }
    return this;
}

const screen = Render.GetScreenSize();

/** Библиотека основанная на Cheat @link https://docs.onecrack.shop/onecrack-api/cheat */
exports.Cheat = {
    /**
     * Функция которая заменяет Cheat.Print();
     * @link https://docs.onecrack.shop/onecrack-api/cheat#print
     * 
     * Полезна встроенным JSON.stringify, разделение на строки, а так-же typeof элемента.
     * @param {*} text Текст для вывода в консоль.
     * @param {Boolean=} dev Выводит typeof элемента.
     * @returns {String} Возвращает элемент в виде строки
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.Print("Hello"); // Output: Hello
     * other.Cheat.Print("Hello", true); // Output: Hello: string
     * ```
     */
    Print: function(text, dev) {
        if(text == undefined) return throw_error("Cheat.Print()", "To use this method, you must have the text to print");
        if(typeof text == "object") return Cheat.Print(JSON.stringify(text, null, 2) + (dev ? ": " + typeof text + "\n" : "\n"));

        return Cheat.Print(text + (dev ? ": " + typeof text + "\n" : "\n"));
    },

    /**
     * Функция которая заменяет Cheat.PrintColor(); 
     * @link https://docs.onecrack.shop/onecrack-api/cheat#printcolor
     * 
     * Полезна встроенным JSON.stringify, разделение на строки, а так-же typeof элемента.
     * @param {*} text Текст для вывода в консоль.
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} color Цвет элемента в консоли
     * @param {Boolean=} dev Выводит typeof элемента.
     * @returns {String} Возвращает элемент в виде строки
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.PrintColor("Hello", [255, 255, 255, 255]); // Output: Hello
     * other.Cheat.PrintColor("Hello", [255, 255, 255, 255], true); // Output: Hello: string
     * ```
     */
    PrintColor: function(text, color, dev) {
        if(text == undefined) return throw_error("cheat.PrintColor()", "To use this method, you must have the text to print");
        if(!color || typeof color != "object" || color.length < 4 || color.length > 4) return throw_error("cheat.print_color()", "To use this method, your color must be an Array with 4 elements: Red, Green, Blue, Alpha");

        if(typeof text == "object") return Cheat.PrintColor(color, JSON.stringify(text, null, 2) + (dev ? ": " + typeof text + "\n" : "\n"));

        return Cheat.PrintColor(color, text + (dev ? ": " + typeof text + "\n" : "\n"));
    },

    /**
     * Функция которая заменяет Cheat.PrintChat(); 
     * @link https://docs.onecrack.shop/onecrack-api/cheat#printchat
     * 
     * Полезна встроенным JSON.stringify, разделение на строки, а так-же typeof элемента.
     * @param {*} text Текст для вывода в чат.
     * @param {Boolean=} dev Выводит typeof элемента.
     * @returns {String} Возвращает элемент в виде строки
     * 
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.PrintChat("Hello"); // Output: Hello
     * other.Cheat.PrintChat("Hello", true); // Output: Hello: string
     * ```
     */
    PrintChat: function(text, dev) {
        if(text == undefined) return throw_error("cheat.PrintChat()", "To use this method, you must have the text to print");

        if(typeof text == "object") return Cheat.PrintChat(JSON.stringify(text, null, 2) + (dev ? ": " + typeof text + "\n" : "\n"));

        return Cheat.PrintChat(text + (dev ? ": " + typeof text + "\n" : "\n"));
    },

    /**
     * Функция которая заменяет Cheat.ExecuteCommand(); 
     * @link https://docs.onecrack.shop/onecrack-api/cheat#executecommand
     * 
     * @param {String} cmd Команда для выполнения.
     * 
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.ExecuteCmd("r_aspectration 0.9"); // Now your aspectratio is 0.9
     * ```
     */
    ExecuteCmd: function(cmd) {
        if(!cmd || typeof cmd != "string") return throw_error("cheat.ExecuteCmd", "To use this method, you must have the command");

        return Cheat.ExecuteCommand(cmd);
    }
}

exports.Math = {
    Lerp: function(a, b, percentage) { 
        return a + (b - a) * percentage 
    },

    Clamp: function(val, min, max) {
        if (val > max) return max
        if (min > val) return min
        return val  
    },

    Random: function(min, max, maxIncluded) {
        if(maxIncluded) return Math.floor(Math.random() * (max - min) + 1) + min
        
        return Math.floor(Math.random() * (max - min)) + min
    },

    /** @author Lenin | @link https://yougame.biz/l | @link */
    Vec2D: function(xx, yy){
        this.x = xx;
        this.y = yy;
        this.length = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.toArray = function() {
            return [this.x, this.y];
        }
        return this;
    },

    Vec3D: Vec3D,

    VectorAngles: function(forward, angles) {
        if (forward.y == 0.0 && forward.x == 0.0) {
            angles.x = (forward.z > 0.0) ? 270.0 : 90.0;
            angles.y = 0.0;
        }
        else {
            angles.x = Math.atan2(-forward.z, forward.length2d()) * -180 / Math.PI;
            angles.y = Math.atan2(forward.y, forward.x) * 180 / Math.PI;
            if (angles.y > 90) angles.y -= 180;
            else if (angles.y < 90) angles.y += 180;
            else if (angles.y == 90) angles.y = 0;
        }
        angles.z = 0.0;
    },

    /** @author TIEPCUK | @link https://yougame.biz/members/183696 | @link https://yougame.biz/threads/239797 */
    VectorSubstract: function(Vector_1, Vector_2) {
        return([Vector_1[0] - Vector_2[0], Vector_1[1] - Vector_2[1], Vector_1[2] - Vector_2[2]]);
    },

    VectorDistance: function(Vector_1, Vector_2) {
        var Vector_X = Vector_1[0] - Vector_2[0]
        var Vector_Y = Vector_1[1] - Vector_2[1]
        var Vector_Z = Vector_1[2] - Vector_2[2]
        return Math.sqrt(Vector_X * Vector_X + Vector_Y * Vector_Y + Vector_Z * Vector_Z) 
    },

    VectorDistance2D: function(Vector_1, Vector_2) {
        var Vector_X = Vector_1[0] - Vector_2[0]
        var Vector_Y = Vector_1[1] - Vector_2[1]
        return Math.sqrt(Vector_X * Vector_X + Vector_Y * Vector_Y)
    },

    VectorLength: function(Forward) {
        return Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1] + Forward[2] * Forward[2]);
    },

    VectorLength2D: function(Forward) {
        return Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1]);
    },

    CrossProduct: function(a,b) {
        return new Vec3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    },

    DotProduct: function(a, b) {
        return(a.x * b.x + a.y * b.y, a.z * b.z);
    },

    Deg2Rad: function(Degrees) {
        return Degrees * (Math.PI / 180.0);
    },

    Rad2Deg(Radians) {
        return Radians * (180 / Math.PI);
    },

    CalcAngle: function(vec1, vec2) {
        var qAngles = new Vec3D;
        var delta = new Vec3D((vec1.x - vec2.x), (vec1.y - vec2.y), (vec1.z - vec2.z));
        var hyp = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        qAngles.x = (Math.atan(delta.z / hyp) * (180.0 / Math.PI));
        qAngles.y = (Math.atan(delta.y / delta.x) * (180.0 / Math.PI));
        qAngles.z = 0;
        if (delta.x >= 0) qAngles.y = qAngles.y+180;
        return qAngles;
    },

    ClampAngles: function(angles) {
        if (angles.x > 89.0)
            angles.x = 89.0;
        else if (angles.x < -89.0)
            angles.x = -89.0;
        if (angles.y > 180.0)
            angles.y = 180.0;
        else if (angles.y < -180.0)
            angles.y = -180.0;
        angles.z = 0;
    },

    NormalizeAngles: function(angles) {
        while (angles.x > 89.0)
            angles.x -= 180.0;
        while (angles.x < -89.0)
            angles.x += 180.0;
        while (angles.y < -180.0)
            angles.y += 360.0;
        while (angles.y > 180.0)
            angles.y -= 360.0;
            
        if(angles.z > 0)
            angles.zangles.z = 0.0;
    }
}
/** Библиотека основанная на Render @link https://docs.onecrack.shop/onecrack-api/render */
exports.Render = {
    HSVtoRGB: function(h, s, v) {
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

        return { 
            r: Math.round(r * 255), 
            g: Math.round(g * 255), 
            b: Math.round(b * 255) 
        };
    },

    RGBtoHSV: function(r, g, b) {
        if (arguments.length === 1) {
            g = r.g, b = r.b, r = r.r;
        }
        var max = Math.max(r, g, b) 
        var min = Math.min(r, g, b)
        d = max - min, h, s = (max === 0 ? 0 : d / max),
        v = max / 255
        switch (max) {
            case min: h = 0; break;
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
        
        return {
            h: h,
            s: s,
            v: v
        }
    },

    Arc: function(x, y, radius, start_angle, percent, thickness, color) {
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
    },

    /**
     * Функция для рендера текста с тенью по бокам
     * 
     * @param {Number} x Позиция по горизонтали (x)
     * @param {Number} y Позиция по вертикали (y)
     * @param {Number=} centered Должен ли текст быть центрирован
     * @param {String} text Текст
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} color Цвет текста
     * @param {Render.GetFont} font https://docs.onecrack.shop/onecrack-api/render#getfont
     * 
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * function on_draw() {
     *     const font = Render.GetFont("Verdana.ttf", 11, true);
     *     other.Render.StringShadow(100, 100, 0, "Hello World", [255, 255, 255, 255], font)
     * }
     * 
     * Cheat.RegisterCallback("Draw", "on_draw")
     * ```
     */
    StringShadow: function(x, y, centered, text, color, font) {
        Render.String(x - 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
        Render.String(x + 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
        Render.String(x - 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
        Render.String(x + 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
        Render.String(x, y, centered, text, color, font)
    },

    /**
     * @param {Number} x Позиция по горизонтали (x)
     * @param {Number} y Позиция по вертикали (y)
     * @param {Number=} centered Должен ли текст быть центрирован
     * @param {[text: String, color: Array(red: Number, green: Number, blue: Number, alpha: number)][]} text Масив масивов с текстом и цветом
     * @param {Render.GetFont} font https://docs.onecrack.shop/onecrack-api/render#getfont
     * @param {Number} slice Пробелы между словами
     * @param {Boolean=} shadow Должен ли текст иметь тень справа снизу
     * 
     * @example
     * ```
     * const other = require("./useful.js");
     * const text = [
     *      ["Missed", [255, 255, 255, 255]],
     *      ["Mased", [255, 46, 46, 255]],
     *      ["in the", [255, 255, 255, 255]],
     *      ["neck", [255, 46, 46, 255]],
     *      ["due to", [255, 255, 255, 255]],
     *      ["resolver", [255, 46, 46, 255]]
     *  ]
     *
     *  function on_draw() {
     *      const font = Render.GetFont("Verdana.ttf", 11, true);
     *      other.Render.MultiColoredText(500, 100, 0, text, font, 5, true)
     *  }
     *
     *  Cheat.RegisterCallback("Draw", "on_draw")
     *  ```
     */
    MultiColoredText: function(x, y, centered, text, font, slice, shadow) {
        text.forEach(function(string, i) {
            if(string[0].startsWith("\n")) y += Render.TextSize(string[0], font)[1] + slice
    
            if(shadow) Render.String(x + 1, y + 1, centered || 0, string[0], [0, 0, 0, string[1][3]], font)
            Render.String(x, y, centered || 0, string[0], string[1], font)
    
            x += Render.TextSize(string[0], font)[0] + slice
        })
    },

    OutLineCorner: function(x, y, w, h, size1, size2, color) {
        Render.Line(x - 2, y - 2, x + w - 2, y - 2, color)
        Render.Line(x - 2, y - 2, x - 2, y + h - 2, color)
    
        Render.Line(x + size1 - w + 1, y - 2, x + size1 + 1 , y - 2, color)
        Render.Line(x + size1 + 1, y - 2, x + size1 + 1, y + h - 2, color)
    
        Render.Line(x - 2, y + size2 + 1, x + w - 2, y + size2 + 1, color)
        Render.Line(x - 2, y + size2 + 1, x - 2, y + size2 - h + 1, color)
    
        Render.Line(x + size1 - w + 1, y + size2 + 1, x + size1 + 1, y + size2 + 1, color)
        Render.Line(x + size1 + 1, y + size2 + 1, x + size1 + 1, y + size2 - h + 1, color)
    },

    GamesenseUI: function(x, y, w, h) {
        Render.FilledRect(x - 6, y - 6, w + 13, h + 14, [0, 0, 0, 255]);
        Render.FilledRect(x - 5, y - 5, w + 11, h + 12, [34, 34, 34, 255]);
        Render.FilledRect(x + 1, y, w, h + 1, [0, 0, 0, 255]);
        Render.Rect(x - 1, y - 1, w + 3, h + 3, [56, 56, 56, 255]);
        Render.Rect(x - 5, y - 5, w + 11, h + 12, [56, 56, 56, 255]);
    },

    // Я хз, оно баганутое
    IsOnScreen: function(origin) {
        const w2s = Render.WorldToScreen(origin);
        if(!w2s) return false;
        return screen[0] + 270 > w2s[0] && screen[1] + 500 > w2s[1];
    }
}

exports.Other = {
    CursorBox: function(mouse_pos, x, y, x2, y2) { 
        return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) 
    },

    SetDropdownValue: function(value, index, enable) {
        var mask = 1 << index;
        return enable ? (value | mask) : (value &~ mask)
    }
}
