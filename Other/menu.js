(function CreateErrorHandler(fnCallback) {
	Duktape.errCreate = function (e) {
		if (!(e instanceof Error) || 'thrown' in e || !Object.isExtensible(e)) return e;
		e = fnCallback(e);
		return e;
	}
})(function (e) {
	e.time = new Date();
	Cheat.Print("Found error in the script code, please send next message to the developer: \n");
	Cheat.PrintColor([255, 74, 74, 255], "Information for the developer: error at line " + e.lineNumber + "\n");
	return e;
});

const Other = require("./useful.js");
const IsAnimating = function(anim) {
    while(anim > 0.1 && anim < 0.9) { return true }

    return false
};

/**
 * Discord: Mased#1854
 * Telegram: MasedMSD
 * https://brokencore.club/members/1529
 * https://yougame.biz/members/228508
 * 
 * Текущая версия меню: 2.2.4
 * 
 * ***************
 * TODO:
 * - Hotkey
 * - MultiDropDown
 */

exports.CreateMenu = function(options) {
    const screen = Render.GetScreenSize();
    const drag = {};
    const tabs = ["Credits"];

    var currentTab = tabs[0] || "";

    this.options = {
        name: 'MSD Sync',
        colors: {
            background: [31, 31, 31, 255],
            outline: [117, 117, 117, 125],
            accent: [64, 64, 64, 255],
            accent_color: [147, 94, 250, 255],
            fields: [44, 46, 49, 255],
            text: [241, 241, 241, 255],
            shadow: [0, 0, 0, 255],
    
            elements: {
                checkbox: {
                    inner_background: [32, 32, 32, 255]
                },
    
                button: {
                    inner_background: [32, 32, 32, 255]
                },
    
                slider: {
                    inner_background: [32, 32, 32, 255],
                    inner_line: [52, 52, 52, 255]
                },
    
                dropdown: {
                    inner_background: [32, 32, 32, 255]
                },
    
                colorpicker: {
                    inner_background: [32, 32, 32, 255]
                }
            }
        },
        size: { width: 580, height: 480 }
    };

    UI.AddSubTab(["Rage", "SUBTAB_MGR"], this.options.name);
    UI.AddSliderInt(["Rage", this.options.name, this.options.name], this.options.name + "_x", 0, screen[0]);
    UI.AddSliderInt(["Rage", this.options.name, this.options.name], this.options.name + "_y", 0, screen[1]);
    UI.AddSliderFloat(["Rage", this.options.name, this.options.name], this.options.name + "_scale", 0.80, 1.5);
    UI.AddSliderFloat(["Rage", this.options.name, this.options.name], this.options.name + "_anim", 0.5, 3);

    this.ui = {
        subtab: ["Rage", this.options.name, this.options.name],
        pos_x: ["Rage", this.options.name, this.options.name, this.options.name + "_x"],
        pos_y: ["Rage", this.options.name, this.options.name, this.options.name + "_y"],
        scale: ["Rage", this.options.name, this.options.name, this.options.name + "_scale"],
        animSpeed: ["Rage", this.options.name, this.options.name, this.options.name + "_anim"],
    };

    this.data = {
        checkboxes: [],
        buttons: [],
        sliders: [],
        colorPickers: [],
        dropdowns: [], // Ххыхыых даунс
        labels: [],
        items: [],
        active: [] // Нет, passive
    }; // Пиздец какой-то честно говоря, сейчас 23:19 08.09.22 и я хуй знает как я буду делать элементы

    this.animations = {
        ui: {
            background: 0,
            fields: 0,
            fonts: 0,
            elements: {
                width: 0,
                height: 0,
                alpha: 0
            }
        }
    };

    this.schemas = {
        checkbox: function(path, name) {
            const data = {
                type: "checkbox",
                path: path,
                name: name,
                value: false,
                animation: 0
            };

            return data;
        },

        button: function(path, name) {
            const data = {
                type: "button",
                path: path,
                name: name,
                value: false,
                animation: 0
            };

            return data;
        },

        slider: function(path, name, min, max, def) {
            const data = {
                type: "slider",
                path: path,
                name: name,
                value: (def).toString() || min,
                min: min,
                max: max,
                animation: 0
            };

            return data;
        },

        label: function(path, name, text) {
            const data = {
                type: "label",
                path: path,
                name: name,
                value: text,
                animation: 0
            };

            return data;
        },

        dropdown: function(path, name, elements) {
            const data = {
                type: "dropdown",
                path: path,
                name: name,
                value: false,
                current: undefined,
                elements: elements,
                animation: 0
            };

            return data;
        },

        colorpicker: function(path, name) {
            const data = {
                type: "colorpicker",
                path: path,
                name: name,
                value: false,
                color: [1, 1, 1],
                colorRGB: [255, 255, 255, 255],
                animation: 0
            };

            return data;
        }
    };

    this.sizes = {
        checkbox: [20, 20],
        button: [250, 20],
        slider: [250, 10],
        dropdown: [250, 20],
        colorpicker: [20, 20]
    };

    /**
     * Фукнции для разработки меню. Они не понадобятся при создании скрипта(наверное)
     * Но будут полезны мне для пин теста
     */

    this.GetUI = function() {
        return this.ui;
    };

    this.GetOptions = function() {
        return this.options;
    };

    this.GetScale = function() {
        // const options = this.GetOptions();

        // return UI.GetValue(["Rage", this.options.name, this.options.name, this.options.name + "_scale"]);
        return 1
    };

    this.GetData = function() {
        return this.data;
    };

    this.GetAnimations = function() {
        return this.animations;
    };

    this.GetSize = function(scaleIncluded, animationIncluded) {
        const scale = this.GetScale();
        const animation = this.GetAnimations();
        
        return [
            (this.options.size.width 
            * (scaleIncluded ? scale : 1))
            * animation.ui.background.toFixed(3),
            (this.options.size.height 
            * (scaleIncluded ? scale : 1))
            * animation.ui.background.toFixed(3)
        ];
    };

    this.GetElementsSize = function() {
        return this.sizes;
    };

    this.GetPosition = function() {
        return [UI.GetValue(this.ui.pos_x), UI.GetValue(this.ui.pos_y)];
    };

    this.GetSource = function() {
        return this;
    };

    this.DrawAnimations = function() {
        const animations = this.GetAnimations();
        const animationSpeed = UI.GetValue(["Rage", this.options.name, this.options.name, this.options.name + "_anim"])

        animations.ui.background = Other.Math.Lerp(animations.ui.background, UI.IsMenuOpen() ? 1 : 0, 0.2 * animationSpeed);
        animations.ui.fields = Other.Math.Lerp(animations.ui.fields, UI.IsMenuOpen() ? 1 : 0, 0.1 * animationSpeed);
        animations.ui.fonts = Other.Math.Lerp(animations.ui.fonts, UI.IsMenuOpen() ? 1 : 0, 0.1 * animationSpeed);

        animations.ui.elements.width = Other.Math.Lerp(animations.ui.elements.width, UI.IsMenuOpen() ? 1 : 0, 0.1 * animationSpeed);
        animations.ui.elements.height = Other.Math.Lerp(animations.ui.elements.height, UI.IsMenuOpen() ? 1 : 0, 0.1 * animationSpeed);
        animations.ui.elements.alpha = Other.Math.Lerp(animations.ui.elements.alpha, UI.IsMenuOpen() ? 1 : 0, 0.1 * animationSpeed);

        return animations;
    };

    this.Drag = function(x, y, w, h, item) {
        if (!drag[item]) {
            drag[item] = {};
            drag[item].drag_position = [0, 0];
            drag[item].is_dragging = false;
        };
    
        if (Other.Other.CursorBox(Input.GetCursorPosition(), x, y, x + w, y + h)) {
            if (Input.IsKeyPressed(0x01) && !drag[item].is_dragging && (!current_dragging_item || current_dragging_item == item)) {
                drag[item].is_dragging = true;
                current_dragging_item = item;
                drag[item].drag_position = [x - Input.GetCursorPosition()[0], y - Input.GetCursorPosition()[1]];
            };
        };
        
        if (!Input.IsKeyPressed(0x01)) {
            drag[item].is_dragging = false;
            current_dragging_item = undefined;
        };
    
        if (drag[item].is_dragging && UI.IsMenuOpen()) {
            UI.SetValue(['Rage', this.options.name, this.options.name, item + '_x'], Input.GetCursorPosition()[0] + drag[item].drag_position[0]);
            UI.SetValue(['Rage', this.options.name, this.options.name, item + '_y'], Input.GetCursorPosition()[1] + drag[item].drag_position[1]);
        };

        return [this.GetPosition()[0], this.GetPosition()[1]];
    };

    this.DrawTabs = function(position, size, colors, fonts, tabs) {
        const animations = this.DrawAnimations();
        if(animations.ui.background.toFixed(1) <= 0.6) return;
        
        const color = this.GetOptions().colors.accent_color;

        var add_width = 0;

        tabs.forEach(function(tab) { // Hardcode погнал )0)))
            const textSize = Render.TextSize(tab, fonts.tab)

            // if(currentTab === tab) {
            //     add_width += 5

            //     Render.FilledRect(
            //         (position[0] + size[0] - 15 - textSize[0] - add_width) * animations.ui.fields.toFixed(3), 
            //         position[1] + 11, 
            //         (textSize[0] + 10) * animations.ui.fields.toFixed(1), 
            //         (textSize[1] + 5) * animations.ui.fields.toFixed(1), 
            //         [171, 171, 171, 45 * animations.ui.fields.toFixed(1)]
            //     );
            // }

            Render.String(position[0] + size[0] - 9 - textSize[0] - add_width, position[1] + 11, 0, tab, [colors.shadow[0], colors.shadow[1], colors.shadow[2], colors.shadow[3] * animations.ui.fonts], fonts.tab);
            Render.String(position[0] + size[0] - 10 - textSize[0] - add_width, position[1] + 10, 0, tab, 
                currentTab === tab
                ? [color[0], color[1], color[2], color[3] * animations.ui.fonts]
                : [colors.text[0], colors.text[1], colors.text[2], colors.text[3] * animations.ui.fonts], 
            fonts.tab);

            add_width += textSize[0] + 15

            if(Other.Other.CursorBox(Input.GetCursorPosition(), 
                position[0] + size[0] - 10 - add_width,
                position[1] + 10,
                position[0] + size[0] - 10 - add_width + textSize[0],
                position[1] + 10 + textSize[1]
            ) && Input.IsKeyPressed(0x01)) {
                currentTab = tab;
            }
        });

        return tabs;
    };

    this.DrawElements = function(textScaling) {
        const elements = this.GetData();
        const position = this.GetPosition();
        const size = this.GetSize(true, true);
        const options = this.GetOptions();
        const scale = this.GetScale();
        const sizes = this.GetElementsSize();
        const animations = this.GetAnimations();

        const colors = options.colors;
        const fonts = {
            logo: Render.GetFont("Verdana.ttf", 21 * (textScaling ? scale : 1), true),
            checkbox: Render.GetFont("Verdana.ttf", 14 * (textScaling ? scale : 1), true),
            button: Render.GetFont("Verdana.ttf", 14 * (textScaling ? scale : 1), true),
            slider: Render.GetFont("Verdana.ttf", 14 * (textScaling ? scale : 1), true),
            label: {
                title: Render.GetFont("Verdana.ttf", 14 * (textScaling ? scale : 1), true),
                text: Render.GetFont("Verdana.ttf", 13 * (textScaling ? scale : 1), true)
            },
            dropdown: {
                title: Render.GetFont("Verdana.ttf", 14 * (textScaling ? scale : 1), true),
                element: Render.GetFont("Verdana.ttf", 13 * (textScaling ? scale : 1), true),
            },
            colorpicker: Render.GetFont("Verdana.ttf", 14 * (textScaling ? scale : 1), true)
        };

        var add_height = { "General": 0, "Main": 0 };

        const AddWidth = function(Element) {
            return (Element.path[1] == "General" ? 0 : size[0] / 2 - 5) * animations.ui.elements.width.toFixed(3);
        };

        const AddHeight = function(Element) {
            return (add_height[Element.path[1]] * animations.ui.elements.height.toFixed(3));
        };

        const AddAlpha = function(color) {
            return [color[0], color[1], color[2], color[3] * animations.ui.elements.alpha.toFixed(3)]
        };

        const GetColor = function(color, opacity) {
            var temp = [color[0], color[1], color[2]];
            temp[3] = opacity;
            return temp;
        };

        const HSVToRGB = function(h, s, v){
            var r, g, b, i, f, p, q, t, a;
            if (arguments.length === 1) {
                s = h[1], v = h[2], a = h[3], h = h[0]
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
                a
            ]
        };

        const RGBToHSV = function(col) {
            var g = col[1], b = col[2], a = col[3], r = col[0];
            var max = Math.max(r, g, b), min = Math.min(r, g, b),
                d = max - min,
                h,
                s = (max === 0 ? 0 : d / max),
                v = max / 255;
        
            switch (max) {
                case min: h = 0; break;
                case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
                case g: h = (b - r) + d * 2; h /= 6 * d; break;
                case b: h = (r - g) + d * 4; h /= 6 * d; break;
            }
        
            return [h, s, v, a];
        };

        const draw_checkbox = function(E, x, y) {
            Render.FilledRect(x + AddWidth(E), y + AddHeight(E), (sizes.checkbox[0] * scale), (sizes.checkbox[1] * scale), AddAlpha(colors.elements.checkbox.inner_background));
            Render.Rect(x + AddWidth(E), y + AddHeight(E), (sizes.checkbox[0] * scale), (sizes.checkbox[1] * scale), AddAlpha(colors.outline));

            if(E.value) Render.FilledRect(x + AddWidth(E), y + AddHeight(E), (sizes.checkbox[0] * scale), (sizes.checkbox[1] * scale), AddAlpha(colors.accent_color));

            Render.String(x + AddWidth(E) + (sizes.checkbox[0] * scale) + 8, y + 1 + AddHeight(E), 0, E.name, AddAlpha(colors.shadow), fonts.checkbox);
            Render.String(x + AddWidth(E) + (sizes.checkbox[0] * scale) + 7, y + AddHeight(E), 0, E.name, AddAlpha(colors.text), fonts.checkbox);

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + AddWidth(E),
                y + AddHeight(E),
                x + AddWidth(E) + (sizes.checkbox[0] * scale),
                y + AddHeight(E) + (sizes.checkbox[1] * scale)
            ) && !IsAnimating(E.animation)) {
                if(Input.IsKeyPressed(0x01)) E.value = !E.value
            }

            E.animation = Other.Math.Lerp(E.animation, E.value ? 1 : 0, 0.2);

            add_height[E.path[1]] += (sizes.checkbox[1] * scale) + 5
        };

        const draw_button = function(E, x, y) {
            Render.FilledRect(x + AddWidth(E), y + AddHeight(E), (sizes.button[0] * scale), (sizes.button[1] * scale), AddAlpha(colors.elements.button.inner_background));
            Render.Rect(x + AddWidth(E), y + AddHeight(E), (sizes.button[0] * scale), (sizes.button[1] * scale), AddAlpha(colors.outline));
        
            Render.String(x + 1 + ((sizes.button[0] * scale) / 2) + AddWidth(E), y + 1 + AddHeight(E), 1, E.name, AddAlpha(colors.shadow), fonts.button);
            Render.String(x + ((sizes.button[0] * scale) / 2) + AddWidth(E), y + AddHeight(E), 1, E.name, AddAlpha(colors.text), fonts.button);

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + AddWidth(E),
                y + AddHeight(E),
                x + AddWidth(E) + (sizes.button[0] * scale),
                y + AddHeight(E) + (sizes.button[1] * scale)
            ) && !IsAnimating(E.animation)) {
                if(Input.IsKeyPressed(0x01)) E.value = true
            }

            E.animation = Other.Math.Lerp(E.animation, E.value ? 1 : 0, 0.2);

            add_height[E.path[1]] += (sizes.button[1] * scale) + 5;
        };

        const draw_slider = function(E, x, y) {
            Render.String(x + 1 + AddWidth(E), y - 11 + AddHeight(E), 0, E.name, AddAlpha(colors.shadow), fonts.slider)
            Render.String(x + AddWidth(E), y - 12 + AddHeight(E), 0, E.name, AddAlpha(colors.text), fonts.slider)

            Render.String(x + 1 + ((sizes.slider[0] * scale) - Render.TextSize((E.value).toString(), fonts.slider)[0]) + AddWidth(E), y - 11 + AddHeight(E), 0, (E.value).toString(), AddAlpha(colors.shadow), fonts.slider)
            Render.String(x + ((sizes.slider[0] * scale) - Render.TextSize((E.value).toString(), fonts.slider)[0]) + AddWidth(E), y - 12 + AddHeight(E), 0, (E.value).toString(), AddAlpha(colors.text), fonts.slider)

            Render.FilledRect(x + AddWidth(E), y - 5 + AddHeight(E) + Render.TextSize(E.name, fonts.slider)[1], (sizes.slider[0] * scale), (sizes.slider[1] * scale), AddAlpha(colors.elements.slider.inner_background));
            Render.FilledRect(x + 3 + AddWidth(E), y - 5 + 3 + AddHeight(E) + Render.TextSize(E.name, fonts.slider)[1], (sizes.slider[0] * scale) - 6, (sizes.slider[1] * scale) - 6, AddAlpha(colors.elements.slider.inner_line));
            Render.Rect(x + AddWidth(E), y - 5 + AddHeight(E) + Render.TextSize(E.name, fonts.slider)[1], (sizes.slider[0] * scale), (sizes.slider[1] * scale), AddAlpha(colors.outline));

            Render.FilledRect(x + 3 + ((E.value - E.min) / (E.max - E.min) * ((sizes.slider[0] * scale) - 9)) + AddWidth(E), y - 5 + AddHeight(E) + Render.TextSize(E.name, fonts.slider)[1], (3 * scale), (9 * scale), AddAlpha(colors.accent_color))

            const percent = ((sizes.slider[0] * scale) - 3) / Math.abs(E.min - E.max);

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + (AddWidth(E) - 6),
                y - 5 + AddHeight(E) + Render.TextSize(E.name, fonts.slider)[1],
                x + (AddWidth(E) - 6) + (sizes.slider[0] * scale),
                y - 5 + AddHeight(E) + Render.TextSize(E.name, fonts.slider)[1] + (sizes.slider[1] * scale)
            )) {
                if(Input.IsKeyPressed(0x01)) {
                    const cursor = Input.GetCursorPosition();
                    const value = Other.Math.Clamp(Math.round(((cursor[0] - (x + AddWidth(E))) / percent) + E.min), E.min, E.max)
                    
                    E.value = value
                }
            }

            add_height[E.path[1]] += (sizes.slider[1] + 5 * scale) + (20 * scale);
        };

        const draw_label = function(E, x, y) {
            Render.String(x + 1 + AddWidth(E), y + 1 + AddHeight(E), 0, E.name, AddAlpha(colors.shadow), fonts.label.title);
            Render.String(x + AddWidth(E), y + AddHeight(E), 0, E.name, AddAlpha(colors.text), fonts.label.title);
        
            Render.Line(x + 1 + AddWidth(E), y + AddHeight(E) + 8 + Render.TextSize(E.name, fonts.label.title)[1], x + 1 + AddWidth(E) + (200 * scale), y + AddHeight(E) + 8 + Render.TextSize(E.name, fonts.label.title)[1], AddAlpha([71, 71, 71, 155]));
        
            Render.String(
                x + 1 + AddWidth(E),
                y + 1 + AddHeight(E) + 8 + 5 + Render.TextSize(E.name, fonts.label.title)[1],
                0,
                E.value,
                AddAlpha(colors.shadow),
                fonts.label.text
            )

            Render.String(
                x + AddWidth(E),
                y + AddHeight(E) + 8 + 5 + Render.TextSize(E.name, fonts.label.title)[1],
                0,
                E.value,
                AddAlpha(colors.text),
                fonts.label.text
            );

            add_height[E.path[1]] += (10 + (Render.TextSize(E.name, fonts.label.title)[1]) + 8 + 5 + Render.TextSize(E.value, fonts.label.text)[1] * scale)
        };

        const draw_dropdown = function(E, x, y) {
            var add_height_dropdown = 0

            if(E.value) {
                E.elements.forEach(function(element) {
                    add_height_dropdown += (Render.TextSize(element, fonts.dropdown.element)[1] + 4)
                })
            }

            Render.String(x + 1 + AddWidth(E), y - 7 + AddHeight(E), 0, E.name, colors.shadow, fonts.dropdown.title)
            Render.String(x + AddWidth(E), y - 8 + AddHeight(E), 0, E.name, colors.text, fonts.dropdown.title)

            Render.FilledRect(x + AddWidth(E), y + AddHeight(E) + Render.TextSize(E.name, fonts.dropdown.title)[1], (sizes.dropdown[0] * scale), (sizes.dropdown[1] * scale) + (add_height_dropdown * E.animation.toFixed(3)), colors.elements.dropdown.inner_background)
            Render.Rect(x + AddWidth(E), y + AddHeight(E) + Render.TextSize(E.name, fonts.dropdown.title)[1], (sizes.dropdown[0] * scale), (sizes.dropdown[1] * scale) + (add_height_dropdown * E.animation.toFixed(3)), colors.outline)

            Render.String(x + 3 + AddWidth(E), y + AddHeight(E) + Render.TextSize(E.name, fonts.dropdown.title)[1], 0, E.current || "None...", colors.text, fonts.dropdown.title)

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + AddWidth(E),
                y + AddHeight(E) + Render.TextSize(E.name, fonts.dropdown.title)[1],
                x + AddWidth(E) + (sizes.dropdown[0] * scale),
                y + AddHeight(E) + (sizes.dropdown[1] * scale) + Render.TextSize(E.name, fonts.dropdown.title)[1]
            ) && !IsAnimating(E.animation)) {
                if(Input.IsKeyPressed(0x01)) E.value = !E.value
            }

            // if(Other.Other.CursorBox(
            //     Input.GetCursorPosition(),
            //     x + AddWidth(E) + (sizes.dropdown[0] * scale),
            //     y + AddHeight(E),
            //     x + AddWidth(E) + 20 + (sizes.dropdown[0] * scale),
            //     y + AddHeight(E) + (sizes.dropdown[1] * scale)
            // ) && !IsAnimating(E.animation)) {
            //     if(Input.IsKeyPressed(0x01)) E.value = false
            // }

            if(E.value) {
                E.elements.forEach(function(element) {
                    Render.String(x + 4 + AddWidth(E), y + 1 + Render.TextSize(E.name, fonts.dropdown.title)[1] + ((Render.TextSize(element, fonts.dropdown.element)[1] + 4) + AddHeight(E)) * E.animation.toFixed(3), 0, element, colors.shadow, fonts.dropdown.title)
                    Render.String(x + 3 + AddWidth(E), y + Render.TextSize(E.name, fonts.dropdown.title)[1] + ((Render.TextSize(element, fonts.dropdown.element)[1] + 4) + AddHeight(E)) * E.animation.toFixed(3), 0, element, colors.text, fonts.dropdown.title)

                    if(E.current === element) Render.FilledRect(x + AddWidth(E), y + Render.TextSize(E.name, fonts.dropdown.title)[1] + ((Render.TextSize(element, fonts.dropdown.element)[1] + 4) + AddHeight(E)) * E.animation.toFixed(3), (sizes.dropdown[0] * scale), (20 * scale), [171, 171, 171, 45])

                    if(Other.Other.CursorBox(
                        Input.GetCursorPosition(),
                        x + AddWidth(E),
                        y + (Render.TextSize(element, fonts.dropdown.element)[1] + 4) + Render.TextSize(E.name, fonts.dropdown.title)[1] + AddHeight(E),
                        x + AddWidth(E) + (sizes.dropdown[0] * scale),
                        y + (Render.TextSize(element, fonts.dropdown.element)[1] + 4) + Render.TextSize(E.name, fonts.dropdown.title)[1] + AddHeight(E) + (sizes.dropdown[1] * scale)
                    ) && !IsAnimating(E.animation)) {
                        if(Input.IsKeyPressed(0x01)) {
                            E.current = element
                        }
                    }

                    add_height[E.path[1]] += (Render.TextSize(element, fonts.dropdown.element)[1] + 4)
                })
            }

            E.animation = Other.Math.Lerp(E.animation, E.value ? 1 : 0, 0.2)
            add_height[E.path[1]] += (sizes.dropdown[1] * scale) + Render.TextSize(E.name, fonts.dropdown.title)[1] + 10;
        };

        const draw_colorpicker = function(E, x, y) {
            Render.FilledRect(x + AddWidth(E), y + AddHeight(E), (sizes.colorpicker[0] * scale), (sizes.colorpicker[1] * scale), E.colorRGB);
            Render.Rect(x + AddWidth(E), y + AddHeight(E), (sizes.colorpicker[0] * scale), (sizes.colorpicker[1] * scale), colors.outline);

            Render.String(x + AddWidth(E) + (sizes.colorpicker[0] * scale) + 8 + 1, y + AddHeight(E) + 1, 0, E.name, colors.shadow, fonts.colorpicker)
            Render.String(x + AddWidth(E) + (sizes.colorpicker[0] * scale) + 8, y + AddHeight(E), 0, E.name, colors.text, fonts.colorpicker)

            if(E.value) {
                Render.FilledRect(x + (sizes.colorpicker[0] * scale) + 5 + AddWidth(E), y + AddHeight(E), (160 * scale), (190 * scale), colors.elements.colorpicker.inner_background);
                Render.Rect(x + (sizes.colorpicker[0] * scale) + 5 + AddWidth(E), y + AddHeight(E), (160 * scale), (190 * scale), colors.outline);

                for(v = 0; v < (150 * scale); v++){
                    var opacity = Other.Math.Clamp(255 * 2 - v, 0, 255);
                    
                    Render.GradientRect(x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E), y + (5 * scale) + AddHeight(E) + v, (150 * scale), 1, 1, 
                        GetColor(HSVToRGB(E.color[0], 0, 1 - (v / (150 * scale))), opacity), 
                        GetColor(HSVToRGB(E.color[0], 1, 1 - (v / (150 * scale))), opacity)
                    );
                };

                if(Other.Other.CursorBox(Input.GetCursorPosition(), x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E), y + (5 * scale) + AddHeight(E), x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E) + (150 * scale) + 2, y + (5 * scale) + AddHeight(E) + (150 * scale) + 2)){
                    if(Input.IsKeyPressed(0x01)){
                        E.color[1] = Other.Math.Clamp(((Input.GetCursorPosition()[0] - (x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E))) / (150 * scale)), 0, 1);
                        E.color[2] = Other.Math.Clamp(((Input.GetCursorPosition()[1] - (y + 5 + (5 * scale) + AddHeight(E))) / (150 * scale)), 0, 1);

                        E.colorRGB = HSVToRGB([E.color[0], E.color[1], 1 - E.color[2], E.color[3] || 255])
                    }
                }

                for(h = 0; h < 3; h++) {

                    // Я блять даже не понимаю что это за пиздец
                    // Я всё это хаваю, у меня нет выбора

                    Render.GradientRect(
                        x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E) + (h * ((1 / 5.1) * 255)), 
                        y + (5 * scale) + AddHeight(E) + 10 + (145 * scale), 
                        255 * (1 / 5.1), 
                        10, 
                        1, 
                        GetColor(HSVToRGB(h * (1 / 3), 1, 1), 255), 
                        GetColor(HSVToRGB((h + 1) * (1 / 3), 1, 1), 255)
                    );
                };

                if(Other.Other.CursorBox(Input.GetCursorPosition(), 
                    x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E),
                    y + (5 * scale) + AddHeight(E) + 10 + (145 * scale),
                    x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E) + (150 * scale),
                    y + (5 * scale) + AddHeight(E) + 10 + (145 * scale) + 10
                )) {
                    if(Input.IsKeyPressed(0x01)) {
                        E.color[0] = Other.Math.Clamp((Input.GetCursorPosition()[0] - (x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E))) / (150 * scale), 0, 1);

                        E.colorRGB = HSVToRGB([E.color[0], E.color[1], 1 - E.color[2], E.color[3] || 255])
                    }
                }

                Render.GradientRect(
                    x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E), 
                    y + (5 * scale) + AddHeight(E) + 10 + (160 * scale), 
                    (150 * scale), 
                    10, 
                    1, 
                    [E.colorRGB[0], E.colorRGB[1], E.colorRGB[2], 0], 
                    GetColor(E.colorRGB, 255)
                );

                if(Other.Other.CursorBox(Input.GetCursorPosition(), 
                    x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E),
                    y + (5 * scale) + AddHeight(E) + 10 + (145 * scale) + 15,
                    x + (sizes.colorpicker[0] * scale) + 5 + (5 * scale) + AddWidth(E) + (150 * scale),
                    y + (5 * scale) + AddHeight(E) + 10 + (145 * scale) + 25
                )) {
                    if(Input.IsKeyPressed(0x01)) {
                        E.color[3] = Other.Math.Clamp(Math.round((Input.GetCursorPosition()[0] - (x + (sizes.colorpicker[0] * scale) + 6 + (5 * scale) + AddWidth(E))) / ((148 * scale) / 255), 0, 255));

                        E.colorRGB = HSVToRGB([E.color[0], E.color[1], 1 - E.color[2], E.color[3] || 255])
                    }
                }
            };

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + AddWidth(E),
                y + AddHeight(E),
                x + AddWidth(E) + (sizes.colorpicker[0] * scale),
                y + AddHeight(E) + (sizes.colorpicker[1] * scale)
            ) && !IsAnimating(E.animation)) {
                if(Input.IsKeyPressed(0x01)) E.value = !E.value
            }

            E.animation = Other.Math.Lerp(E.animation, E.value ? 1 : 0, 0.2)
        };

        elements.items.forEach(function(element, i) {
            switch (element.type.toLowerCase()) {
                case "checkbox":
                    if(currentTab !== element.path[0]) return;

                    draw_checkbox(element, position[0] + 20, position[1] + Render.TextSize(options.name, fonts.logo)[1] + 35)
                break;

                case "button": 
                    if(currentTab !== element.path[0]) return;
                    if(element.value) element.value = false;

                    draw_button(element, position[0] + 20, position[1] + Render.TextSize(options.name, fonts.logo)[1] + 35)
                break;

                case "slider":
                    if(currentTab !== element.path[0]) return;

                    draw_slider(element, position[0] + 20, position[1] + Render.TextSize(options.name, fonts.logo)[1] + 45)
                break;

                case "label":
                    if(currentTab !== element.path[0]) return;

                    draw_label(element, position[0] + 20, position[1] + Render.TextSize(options.name, fonts.logo)[1] + 35)
                break;

                case "dropdown":
                    if(currentTab !== element.path[0]) return;

                    draw_dropdown(element, position[0] + 20, position[1] + Render.TextSize(options.name, fonts.logo)[1] + 40)
                break;

                case "colorpicker":
                    if(currentTab !== element.path[0]) return;

                    draw_colorpicker(element, position[0] + 20, position[1] + Render.TextSize(options.name, fonts.logo)[1] + 35)
                break;
            
                default: break;
            }
        });
    };

    this.DrawUI = function(textScaling) {
        const animations = this.DrawAnimations();
        if(animations.ui.background.toFixed(1) <= 0.2) return;

        const position = this.GetPosition();
        const size = this.GetSize(true, true);
        const options = this.GetOptions();
        const scale = this.GetScale();

        const name = options.name;
        const colors = options.colors;
        const fonts = {
            logo: Render.GetFont("Verdana.ttf", 21 * (textScaling ? scale : 1), true),
            tab: Render.GetFont("Verdana.ttf", 21 * (textScaling ? scale : 1), true)
        }

        Render.FilledRect(position[0], position[1], size[0], size[1], [colors.background[0], colors.background[1], colors.background[2], colors.background[3] * animations.ui.background]); // Главное меню

        Render.FilledRect(position[0] + 10, position[1] + Render.TextSize(name, fonts.logo)[1] + 25, (size[0] - 30) / 2, size[1] - (Render.TextSize(name, fonts.logo)[1] + 35), [colors.fields[0], colors.fields[1], colors.fields[2], colors.fields[3] * animations.ui.fields]); // Левый Field
        Render.FilledRect(position[0] + 20 + (size[0] - 30) / 2, position[1] + Render.TextSize(name, fonts.logo)[1] + 25, (size[0] - 29) / 2, size[1] - (Render.TextSize(name, fonts.logo)[1] + 35), [colors.fields[0], colors.fields[1], colors.fields[2], colors.fields[3] * animations.ui.fields]); // Правый Field    

        Render.String(position[0] + 11, position[1] + 11, 0, name, [colors.shadow[0], colors.shadow[1], colors.shadow[2], colors.shadow[3] * animations.ui.fonts], fonts.logo); // Тень логотипа
        Render.String(position[0] + 10, position[1] + 10, 0, name, [colors.text[0], colors.text[1], colors.text[2], colors.text[3] * animations.ui.fonts], fonts.logo); // Логотип

        this.DrawTabs(position, size, colors, fonts, tabs);
        this.DrawElements(textScaling);

        return position;
    };

    this.AddTab = function(name) {
        tabs.push(name)
    };

    this.AddCheckbox = function(path, name) {
        const data = this.GetData();
        const checkbox = this.schemas.checkbox(path, name);

        data.checkboxes.push(checkbox);
        data.items.push(checkbox);
    };

    this.AddButton = function(path, name) {
        const data = this.GetData();
        const button = this.schemas.button(path, name);

        data.buttons.push(button);
        data.items.push(button);
    };

    this.AddSlider = function(path, name, min, max, def) {
        const data = this.GetData();
        const slider = this.schemas.slider(path, name, min, max, def);

        data.sliders.push(slider);
        data.items.push(slider);
    };

    this.AddLabel = function(path, name, text) {
        const data = this.GetData();
        const label = this.schemas.label(path, name, text);

        data.labels.push(label);
        data.items.push(label);
    };

    this.AddDropdown = function(path, name, elements) {
        const data = this.GetData();
        const dropdown = this.schemas.dropdown(path, name, elements);

        data.dropdowns.push(dropdown);
        data.items.push(dropdown);
    };

    this.AddColorPicker = function(path, name) {
        const data = this.GetData();
        const colorpicker = this.schemas.colorpicker(path, name);

        data.colorPickers.push(colorpicker);
        data.items.push(colorpicker);
    };

    this.GetValue = function(type, path, name) {
        const data = this.GetData();
        var result = undefined;

        data[type].forEach(function(element) {
            if(element.path.toString() == path.toString() && element.name == name) {
                result = (element.colorRGB || element.current || element.value)
            }
        })

        return result;
    };
};
