/** @author Mased | @version 1.0.9 */

type Vec2D = { x: number, y: number };
type Vec3D = { x: number, y: number, z: number };

/** @author dermagister | @link https://yougame.biz/magister | @link https://yougame.biz/threads/221305 */
const throw_error = function(method: string, string: string): void {
    Cheat.PrintChat("\x0E" + "\x02 Whoops, looks like something went wrong. Please check your console.\n");
    Cheat.ExecuteCommand("playvol resource/warning.wav 100");
    return Cheat.PrintColor([255, 0, 0, 255], "\nuseful.js \n - " + method + ": " + string + "\n");
}

const screen = Render.GetScreenSize();

/** Библиотека основанная на Cheat @link https://docs.onecrack.shop/onecrack-api/cheat */
export const CheatLIB = {
    /**
     * Функция которая заменяет Cheat.Print();
     * @link https://docs.onecrack.shop/onecrack-api/cheat#print
     * 
     * Полезна встроенным JSON.stringify, разделение на строки, а так-же typeof элемента.
     * @param {*} text Текст для вывода в консоль.
     * @param {Boolean=} dev Выводит typeof элемента.
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.Print("Hello"); // Output: Hello
     * other.Cheat.Print("Hello", true); // Output: Hello: string
     * ```
     */
    Print: function(text: string, dev?: boolean): void {
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
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.PrintColor("Hello", [255, 255, 255, 255]); // Output: Hello
     * other.Cheat.PrintColor("Hello", [255, 255, 255, 255], true); // Output: Hello: string
     * ```
     */
    PrintColor: function(text: string, color: Color, dev?: boolean): void {
        if(text == undefined) return throw_error("Cheat.PrintColor()", "To use this method, you must have the text to print");
        if(!color || typeof color != "object" || color.length < 4 || color.length > 4) return throw_error("Cheat.PrintColor()", "To use this method, your color must be an Array with 4 elements: Red, Green, Blue, Alpha");
        
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
     * 
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * other.Cheat.PrintChat("Hello"); // Output: Hello
     * other.Cheat.PrintChat("Hello", true); // Output: Hello: string
     * ```
     */
    PrintChat: function(text: string, dev?: boolean): void {
        if(text == undefined) return throw_error("Cheat.PrintChat()", "To use this method, you must have the text to print");
        
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
    ExecuteCmd: function(cmd: string): void {
        if(!cmd || typeof cmd != "string") return throw_error("Cheat.ExecuteCmd", "To use this method, you must have the command");

        return Cheat.ExecuteCommand(cmd);
    }
};

export const MathLIB = {
    Lerp: function(a: number, b: number, percentage: number): number { 
        return a + (b - a) * percentage 
    },

    Clamp: function(val: number, min: number, max: number): number {
        if(val > max) return max
        if(min > val) return min
        return val  
    },

    Random: function(min: number, max: number, maxIncluded: boolean): number {
        if(maxIncluded) return Math.floor(Math.random() * (max - min) + 1) + min
        
        return Math.floor(Math.random() * (max - min)) + min
    },

    /** @author Lenin | @link https://yougame.biz/l | @link */
    Vec2D: function(xx: number, yy: number) {
        return {
            x: xx,
            y: yy,
            Length() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            ToArray() {
                return [this.x, this.y];
            },
            DistTo(other: Vec2D) {
                return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2))  
            },
            Mul(other: Vec2D) {
                return MathLIB.Vec2D(this.x * other.x, this.y * other.y);
            },
            Div(other: Vec2D) {
                return MathLIB.Vec2D(this.x / other.x, this.y / other.y);
            },
            Add(other: Vec2D) {
                return MathLIB.Vec2D(this.x + other.x, this.y + other.y);
            },
            Sub(other: Vec2D) {
                return MathLIB.Vec2D(this.x - other.x, this.y - other.y);
            },
        }
    },

    Vec3D: function(xx: number, yy: number, zz: number) {
        return {
            x: xx,
            y: yy,
            z: zz,
            Length2D() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            Length() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            },
            DistTo(other: Vec3D) {
                return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2) + Math.pow(this.z - other.z, 2))  
            },
            DistTo2D(other: Vec3D) {
                return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2) + Math.pow(this.z - other.z, 2))  
            },
            ToArray() {
                return [this.x, this.y, this.z];
            },
            ToAngle() {
                const angles = MathLIB.Vec3D(0, 0, 0);
                if (this.y == 0.0 && this.x == 0.0) {
                    angles.x = (this.z > 0.0) ? 270.0 : 90.0;
                    angles.y = 0.0;
                }
                else {
                    angles.x = Math.atan2(-this.z, this.Length2D()) * -180 / Math.PI;
                    angles.y = Math.atan2(this.y, this.x) * 180 / Math.PI;
                    if (angles.y > 90) angles.y -= 180;
                    else if (angles.y < 90) angles.y += 180;
                    else if (angles.y == 90) angles.y = 0;
                }
                angles.z = 0.0;
                return angles;
            },
            Clamp() {
                if (this.x < -89.0) this.x = -89.0;
                if (this.x > 89.0) this.x = 89.0;
                while (this.y < -180.0) this.y += 360.0;
                while (this.y > 180.0) this.y -= 360.0;
                this.z = 0.0;
                return this;
            },
            Mul(other: Vec3D) {
                return MathLIB.Vec3D(this.x * other.x, this.y * other.y, this.z * other.z);
            },
            Div(other: Vec3D) {
                return MathLIB.Vec3D(this.x / other.x, this.y / other.y, this.z / other.z);
            },
            Add(other: Vec3D) {
                return MathLIB.Vec3D(this.x + other.x, this.y + other.y, this.z + other.z);
            },
            Sub(other: Vec3D) {
                return MathLIB.Vec3D(this.x - other.x, this.y - other.y, this.z - other.z);
            },
        }
    },

    /** @author TIEPCUK | @link https://yougame.biz/members/183696 | @link https://yougame.biz/threads/239797 */
    VectorSubtract: function(Vector_1: Vector, Vector_2: Vector): Vector {
        return([Vector_1[0] - Vector_2[0], Vector_1[1] - Vector_2[1], Vector_1[2] - Vector_2[2]]);
    },

    VectorDistance: function(Vector_1: Vector, Vector_2: Vector): number {
        const Vector_X = Vector_1[0] - Vector_2[0]
        const Vector_Y = Vector_1[1] - Vector_2[1]
        const Vector_Z = Vector_1[2] - Vector_2[2]
        return Math.sqrt(Vector_X * Vector_X + Vector_Y * Vector_Y + Vector_Z * Vector_Z) 
    },

    VectorDistance2D: function(Vector_1: Vector, Vector_2: Vector): number {
        const Vector_X = Vector_1[0] - Vector_2[0]
        const Vector_Y = Vector_1[1] - Vector_2[1]
        return Math.sqrt(Vector_X * Vector_X + Vector_Y * Vector_Y)
    },

    VectorLength: function(Forward: Vector): number {
        return Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1] + Forward[2] * Forward[2]);
    },

    VectorLength2D: function(Forward: Vector): number {
        return Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1]);
    },

    CrossProduct: function(a: Vec3D, b: Vec3D) {
        return this.Vec3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    },

    DotProduct: function(a: Vec3D, b: Vec3D) {
        return(a.x * b.x + a.y * b.y, a.z * b.z);
    },

    Deg2Rad: function(Degrees: number): number {
        return Degrees * (Math.PI / 180.0);
    },

    Rad2Deg(Radians: number): number {
        return Radians * (180 / Math.PI);
    },

    CalcAngle: function(vec1: Vec3D, vec2: Vec3D) {
        const qAngles = this.Vec3D(0, 0, 0);
        const delta = this.Vec3D((vec1.x - vec2.x), (vec1.y - vec2.y), (vec1.z - vec2.z));
        const hyp = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        qAngles.x = (Math.atan(delta.z / hyp) * (180.0 / Math.PI));
        qAngles.y = (Math.atan(delta.y / delta.x) * (180.0 / Math.PI));
        qAngles.z = 0;
        if(delta.x >= 0) qAngles.y = qAngles.y+180;
        return qAngles;
    },

    ClampAngles: function(angles: Vec3D) {
        if(angles.x > 89.0) angles.x = 89.0;
        else if(angles.x < -89.0) angles.x = -89.0;
        if(angles.y > 180.0) angles.y = 180.0;
        else if(angles.y < -180.0) angles.y = -180.0;
        angles.z = 0;
        return angles;
    },

    NormalizeAngles: function(angles: Vec3D) {
        while(angles.x > 89.0) angles.x -= 180.0;
        while(angles.x < -89.0) angles.x += 180.0;
        while(angles.y < -180.0) angles.y += 360.0;
        while(angles.y > 180.0) angles.y -= 360.0;
        if(angles.z != 0) angles.z = 0.0;
        return angles;
    }
};

/** Библиотека основанная на Render @link https://docs.onecrack.shop/onecrack-api/render */
export const RenderLIB = {
    HSVtoRGB: function(h: number, s: number, v: number): { r: number, g: number, b: number } {
        let r = 0, g = 0, b = 0;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

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

    RGBtoHSV: function(r: any, g: number, b: number): { h: number, s: number, v: number } {
        if (arguments.length === 1) {
            g = r.g, b = r.b, r = r.r;
        }
        
        const max = Math.max(r, g, b) 
        const min = Math.min(r, g, b)
        const d = max - min, s = (max === 0 ? 0 : d / max),
        v = max / 255;
        
        let h = 0;
        
        switch (max) {
            case min: h = 0; break;
            case r: 
                h = (g - b) + d * (g < b ? 6 : 0); 
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
        }
        
        return {
            h: h,
            s: s,
            v: v
        }
    },

    /**
     * 
     * @param {Number} x Позиция по горизонтали (x)
     * @param {Number} y Позиция по вертикали (y)
     * @param {Number} radius Радиус круга
     * @param {Number} start_angle 
     * @param {Number} percent 
     * @param {Number} thickness 
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} color Цвет круга
     */
    Arc: function(x: number, y: number, radius: number, start_angle: number, percent: number, thickness: number, color: Color): void {
        const precision = (2 * Math.PI) / 30;
        const step = Math.PI / 180;
        const inner = radius - thickness;
        const end_angle = (start_angle + percent) * step;
        start_angle = (start_angle * Math.PI) / 180;
        for (; radius > inner; --radius) {
            for (let angle = start_angle; angle < end_angle; angle += precision) {
                const cx = Math.round(x + radius * Math.cos(angle));
                const cy = Math.round(y + radius * Math.sin(angle));
                const cx2 = Math.round(x + radius * Math.cos(angle + precision));
                const cy2 = Math.round(y + radius * Math.sin(angle + precision));
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
    StringShadow: function(x: number, y: number, centered: 1 | 0, text: string, color: Color, font: number): void {
        Render.StringCustom(x - 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
        Render.StringCustom(x + 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
        Render.StringCustom(x - 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
        Render.StringCustom(x + 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
        Render.StringCustom(x, y, centered, text, color, font)
    },

    /**
     * @param {Number} x Позиция по горизонтали (x)
     * @param {Number} y Позиция по вертикали (y)
     * @param {Number=} centered Должен ли текст быть центрирован
     * @param {[text: String, color: Array(red: Number, green: Number, blue: Number, alpha: number)][]} text Массив массивов с текстом и цветом
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
    MultiColoredText: function(x: number, y: number, centered: 1 | 0, text: [string, Color][], font: number, slice: number, shadow: boolean): void {
        text.forEach(function(string: [string, Color]) {
            if(string[0].startsWith("\n")) y += Render.TextSizeCustom(string[0], font)[1] + slice
    
            if(shadow) Render.StringCustom(x + 1, y + 1, centered || 0, string[0], [0, 0, 0, string[1][3]], font)
            Render.StringCustom(x, y, centered || 0, string[0], string[1], font)
    
            x += Render.TextSizeCustom(string[0], font)[0] + slice
        })
    },

    OutLineCorner: function(x: number, y: number, w: number, h: number, size1: number, size2: number, color: Color): void {
        Render.Line(x - 2, y - 2, x + w - 2, y - 2, color)
        Render.Line(x - 2, y - 2, x - 2, y + h - 2, color)
    
        Render.Line(x + size1 - w + 1, y - 2, x + size1 + 1 , y - 2, color)
        Render.Line(x + size1 + 1, y - 2, x + size1 + 1, y + h - 2, color)
    
        Render.Line(x - 2, y + size2 + 1, x + w - 2, y + size2 + 1, color)
        Render.Line(x - 2, y + size2 + 1, x - 2, y + size2 - h + 1, color)
    
        Render.Line(x + size1 - w + 1, y + size2 + 1, x + size1 + 1, y + size2 + 1, color)
        Render.Line(x + size1 + 1, y + size2 + 1, x + size1 + 1, y + size2 - h + 1, color)
    },

    GamesenseUI: function(x: number, y: number, w: number, h: number): void {
        Render.FilledRect(x - 6, y - 6, w + 13, h + 14, [0, 0, 0, 255]);
        Render.FilledRect(x - 5, y - 5, w + 11, h + 12, [34, 34, 34, 255]);
        Render.FilledRect(x + 1, y, w, h + 1, [0, 0, 0, 255]);
        Render.Rect(x - 1, y - 1, w + 3, h + 3, [56, 56, 56, 255]);
        Render.Rect(x - 5, y - 5, w + 11, h + 12, [56, 56, 56, 255]);
    },

    /**
     * @param {Vec3D} origin 
     */
    IsOnScreen: function(origin: Vector): boolean {
        const w2s = Render.WorldToScreen(origin);
        if(!w2s) return false;
        // return screen[0] + 270 > w2s[0] && screen[1] + 500 > w2s[1];
        return w2s[0] > 0 && w2s[1] > 0 && w2s[0] < screen[0] && w2s[1] < screen[1];
    },

    /**
     * @param {Vec2D} origin 
     */
    IsOnScreen2D: function(origin: [number, number]): boolean {
        return origin[0] > 0 && origin[1] > 0 && origin[0] < screen[0] && origin[1] < screen[1];
    },

    LerpColor: function(value: number, min: Color, max: Color): Color {
        const r = min[0] * (1-value) + max[0] * value
        const g = min[1] * (1-value) + max[1] * value
        const b = min[2] * (1-value) + max[2] * value
        const a = min[3] * (1-value) + max[3] * value
        return [r, g, b, a]
    },

    /** @author v4wt345 | @link https://brokencore.club/members/62786 | @link https://brokencore.club/resources/4167 */
    /**
     * Функция для рендера 4-х стороннего градиента
     * @param {Number} x Позиция по горизонтали (x)
     * @param {Number} y Позиция по вертикали (y)
     * @param {Number} w Размер в ширину (width)
     * @param {Number} h Размер в высоту (height)
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} top_left Градиент сверху слева
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} top_right Градиент сверху справа
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} bottom_left Градиент снизу слева
     * @param {[red: Number, green: Number, blue: Number, alpha: Number]} bottom_right Градиент снизу справа
     * 
     * @example
     * ```
     * const other = require("./useful.js");
     * 
     * function on_draw() {
     *     Render.Gradient(100, 100, 100, 100, [255, 255, 255, 255], [255, 0, 0, 255], [0, 255, 0, 255], [0, 0, 255, 255])
     * }
     * 
     * Cheat.RegisterCallback("Draw", "on_draw")
     * ```
     */
    Gradient: function(x: number, y: number, w: number, h: number, top_left: Color, top_right: Color, bottom_left: Color, bottom_right: Color): void {
        if(h < w) {
            for (let  i = 0; i < h; i++) {
                Render.GradientRect(x, y + i, w, 1, 1, this.LerpColor(i / h, top_left, bottom_left), this.LerpColor(i / h, top_right, bottom_right))
            }
        }
        else {
            for (let i = 0; i < w; i++) {
                Render.GradientRect(x + i, y, 1, h, 0, this.LerpColor(i / w, top_left, top_right), this.LerpColor(i / w, bottom_left , bottom_right))
            }
        }
    }
};

export const OtherLIB = {
    CursorBox: function(mouse_pos: [number, number], x: number, y: number, x2: number, y2: number): boolean { 
        return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) 
    },

    SetDropdownValue: function(value: number, index: number, enable: boolean | 1 | 0): number {
        const mask = 1 << index;
        return enable ? (value | mask) : (value &~ mask)
    },

    /**
     * Форматирует строку с помощью RegExp
     * 
     * @param {string} string Строка для изменения
     * @param {object} options Параметры в строке
     * @returns {string}
     * 
     * @example
     * ```
     * 
        const Other = require("./useful.js");

        const string = Other.Other.FormatString("Hello, {{username}}", {
            username: Cheat.GetUsername()
        });

        Cheat.Print(string); // Output: Hello, Mased
     *  ```
     */
    FormatString: function(string: string, options: any): string {
        if(options) {
            Object.keys(options).forEach(function(option) {
                string = string.replace(new RegExp("{{" + option + "}}", "g"), options[option])
            })
        }

        return string
    }
};
