// @ts-nocheck

const Useful = require("./useful.js");
const screen = Render.GetScreenSize();
const build = Cheat.GetUsername() === "Mased" ? "dev" : "release";

/**
 * @param {string} method Метод в котором появляется ошибка
 * @param {string} text Описание ошибки
 */
const ThrowError = function(method, text) {
    throw new Error(Useful.Other.FormatString("[Menu] {{method}}: {{text}}", { method, text }));
};

const AnimateAlpha = function(color, anim) {
    return [color[0], color[1], color[2], color[3] * anim]
};

const Lerp = function(time, start, end_pos) {
    if (time == undefined) {
        time = 0.095
    }

    time = Useful.Math.Clamp(Globals.Frametime() * (time * 175), 0, 1)

    if (typeof(start) == 'object') {
        var start_color = start
        var end_color = end_pos

        start_color[0] = Lerp(time, start_color[0], end_color[0])
        start_color[1] = Lerp(time, start_color[1], end_color[1])
        start_color[2] = Lerp(time, start_color[2], end_color[2])
        start_color[3] = Lerp(time, start_color[3], end_color[3])
        return start_color
    }
    
    var delta = end_pos - start
    delta = delta * time
    delta = delta + start

    if (end_pos == 0 && delta < 0.01 && delta > -0.01) delta = 0
    else if (end_pos == 1 && delta < 1.01 && delta > 0.99) delta = 1

    return delta
}

const ColorEquals = function(firs_color, second_color) {
    return firs_color[0] == second_color[0] && firs_color[1] == second_color[1] && firs_color[2] == second_color[2] && firs_color[3] == second_color[3] 
}

const AnimationItems = [];

const UpdateAnimations = function() {
    for (k in AnimationItems) {
        if (!AnimationItems[k] || !AnimationItems[k].called_this_frame) {
            if ( typeof(GetAnimation(k).number) == 'object') {
                if (ColorEquals(NewAnimation(k, [0, 0, 0, 0], true), [0, 0, 0, 0])) {
                    AnimationItems[k] = undefined
                }
            }
            else {
                if (NewAnimation(k, 0, true) == 0) {
                    AnimationItems[k] = undefined
                }
            }
            continue
        }
        
        AnimationItems[k].called_this_frame = false
    };
};

const NewAnimation = function(name, new_value, removing) {
    if (!AnimationItems[name]) {
        AnimationItems[name] = {}
        AnimationItems[name].color = [0, 0, 0, 0]
        AnimationItems[name].number = 0
        AnimationItems[name].called_this_frame = true
    }

    if (removing == undefined) {   
        AnimationItems[name].called_this_frame = true
    }

    if (typeof(new_value) == 'object') {
        var lerping = Lerp(0.095, AnimationItems[name].color, new_value)
        AnimationItems[name].color = lerping

        return lerping
    }

    var lerping = Lerp(0.095, AnimationItems[name].number, new_value)
    AnimationItems[name].number = lerping

    return lerping
};

const GetAnimation = function(name) {
    return !AnimationItems[name] ? {number : 0, color : [0, 0, 0, 0], called_this_frame : false} : AnimationItems[name]
};

/**
 * @typedef { Function } Menu
 * 
 * @param { string } name Имя меню
 */
exports.createMenu = function(name, menu_size, cb) {
    if(!name) return ThrowError("CreateMenu", "Menu should have name as first argument");
    
    this.options = {
        name: name,
        build: build || "release",
        sizes: {}
    };

    this.themes = {};

    this.data = {};
    this.drag = {};

    /** @private */
    this.Preload = function() {
        UI.AddSliderInt(this.options["name"] + "_x", 0, screen[0]);
        UI.AddSliderInt(this.options["name"] + "_y", 0, screen[1]);
        UI.AddSliderFloat(this.options["name"] + "_scale", 0.5, 3);

        if(build !== "dev") {
            UI.SetEnabled(this.options["name"] + "_x", 0);
            UI.SetEnabled(this.options["name"] + "_y", 0);
            UI.SetEnabled(this.options["name"] + "_scale", 0);
        };

        this.options.sizes["menu"] = {
            width: menu_size[0] || 455,
            height: menu_size[1] || 340,
        };
        
        this.AddTheme("Dark", {
            theme: [32, 32, 32, 255],
            header: [31, 31, 31, 255],
            inner: [22, 22, 22, 255],
            stroke: [37, 37, 37, 255],
            icons: [74, 74, 74, 255],
            accent: [2, 121, 214, 255],
    
            text: [205, 205, 205, 255],
            shadow: [0, 0, 0, 255]
        });

        this.data["tabs"] = {};

        this.data["checkboxes"] = [];

        this.data["items"] = [];

        this.data.indexes = {
            checkboxes: 0
        };

        this.data.menu = {};

        this.AddSubtab("Info");

        this.data["current_tab"] = Object.keys(this.data["tabs"])[0] || "";
    };

    this.GetOptions = function() {
        return this.options;
    };

    this.GetSource = function() {
        return this;
    };

    this.GetThemes = function() {
        return this.themes;
    };

    this.GetPosition = function() {
        return [
            UI.GetValue(this.options.name + "_x"), 
            UI.GetValue(this.options.name + "_y")
        ];
    };

    this.GetData = function() {
        return this.data;
    };

    this.GetAnimations = function() {
        return this.animations;
    };

    this.DrawTabs = function() {
        const tab_keys = Object.keys(this.data["tabs"]);
        const sizes = this.options["sizes"];
        const pos = this.GetPosition();
        const data = this.data;
        const current_theme = this.themes["Dark"];

        const font = Render.AddFont("Segoe UI", ((sizes["menu"].width / 6) - 5) / 6, 600);

        const a_menua = (GetAnimation("menu_alpha")).number
        const a_tabsh = NewAnimation("tabs_height", UI.IsMenuOpen() ? 1 : 0);

        data.menu["navigation"] = { add_height: 0 };

        tab_keys.forEach(function(tab) {
            Render.StringCustom(pos[0] + ((sizes["menu"].width / 6) / 2), (pos[1] + 10) + (data.menu["navigation"].add_height * a_tabsh), 1, tab, AnimateAlpha((data["current_tab"] === tab ? current_theme.accent : current_theme.text), a_menua), font);

            const x1 = pos[0] + 5;
            const y1 = (pos[1] + 5) + (data.menu["navigation"].add_height * a_tabsh);

            const x2 = x1 + ((sizes["menu"].width / 6) - 5)
            const y2 = y1 + Render.TextSizeCustom(tab, font)[1] + 10;

            if(Useful.Other.CursorBox(Input.GetCursorPosition(), x1, y1, x2, y2) && Input.IsKeyPressed(0x01)) data["current_tab"] = tab;

            data.menu["navigation"].add_height += Render.TextSizeCustom(tab, font)[1] + 15;
        });

        if(data.menu["navigation"].add_height > (sizes["menu"].height - 10)) sizes["menu"].height = data.menu["navigation"].add_height + 10;
    };

    this.DrawUI = function() {
        const sizes = this.options["sizes"];
        const colors = this.themes;
        const pos = this.GetPosition();
        const current_theme = colors["Dark"];

        const a_menua = NewAnimation("menu_alpha", UI.IsMenuOpen() ? 1 : 0);
        const a_menuh = NewAnimation("menu_height", UI.IsMenuOpen() ? 1 : 0);

        const nav_width = (sizes["menu"].width / 6);
        const field_width = ((sizes["menu"].width - nav_width) - 30) / 2

        Render.FilledRect(pos[0], pos[1], sizes["menu"].width, (sizes["menu"].height * a_menuh), AnimateAlpha(current_theme.theme, a_menua));

        Render.FilledRect(pos[0], pos[1], nav_width, (sizes["menu"].height * a_menuh), AnimateAlpha(current_theme.inner, a_menua));
        Render.Rect(pos[0], pos[1], nav_width, (sizes["menu"].height * a_menuh), AnimateAlpha(current_theme.stroke, a_menua));

        Render.FilledRect((pos[0] + nav_width) + 10, pos[1] + 10, field_width, (sizes["menu"].height * a_menuh) - 20, AnimateAlpha(current_theme.inner, a_menua));
        Render.Rect((pos[0] + nav_width) + 10, pos[1] + 10, field_width, (sizes["menu"].height * a_menuh) - 20, AnimateAlpha(current_theme.stroke, a_menua));

        Render.FilledRect((pos[0] + nav_width + field_width) + 20, pos[1] + 10, field_width, (sizes["menu"].height * a_menuh) - 20, AnimateAlpha(current_theme.inner, a_menua));
        Render.Rect((pos[0] + nav_width + field_width) + 20, pos[1] + 10, field_width, (sizes["menu"].height * a_menuh) - 20, AnimateAlpha(current_theme.stroke, a_menua));
    };

    this.DrawElements = function() {
        const data = this.GetData();
        const pos = this.GetPosition();
        const sizes = this.options["sizes"];

        const nav_width = (sizes["menu"].width / 6);
        const field_width = ((sizes["menu"].width - nav_width) - 30) / 2

        const x = pos[0] + nav_width + 20;
        const y = pos[1] + 20

        var add_height = { "General": 0, "Other": 0 };

        const AddWidth = function(Element) {
            return (Element.path[1] == "General" ? 0 : field_width + 10)
        };

        const AddHeight = function(Element) {
            return add_height[Element.path[1]]
        };

        const DrawCheckbox = function(E, x, y) {
            Render.FilledRect(x + AddWidth(E), y + AddHeight(E), 20, 20, [255, 255, 255, 255]);

            add_height[E.path[1]] += 30
        };

        this.data["items"].forEach(function(element, i) {
            if(element.path[0] !== data["current_tab"]) return;

            switch (element.type) {
                case "checkbox":
                    DrawCheckbox(element, x, y)
                break;
            }
        });

        sizes["menu"].height = menu_size[1]

        if(add_height["General"] >= sizes["menu"].height - 15) sizes["menu"].height = add_height["General"] + 30;
        if(add_height["Other"] >= sizes["menu"].height - 15) sizes["menu"].height = add_height["Other"] + 30;
    };

    this.AddCheckbox = function(path, name, cb, def) {
        if(!path || typeof path != "object") return ThrowError("AddCheckbox", "You should put path: Array as first argument");
        if(!this.data.tabs[path[0]]) return ThrowError("AddCheckbox", "You don't have \"" + path[0] + "\" subtab")
        if(path[1] != "General" && path[1] != "Other") return ThrowError("AddCheckbox", "Second element of path should be \"General\" or \"Other\"")
        if(!name) return ThrowError("AddCheckbox", "You should put name: String as second argument");
        if(def && typeof def != "boolean") return ThrowError("AddCheckbox", "Default value should be boolean");

        this.data.indexes["checkboxes"] += 1

        const checkbox = {
            id: this.data.indexes["checkboxes"],
            add_height: 30,
            type: "checkbox",
            name: name,
            path: path,
            value: def || false,
            visible: true,
            animation: 0
        };

        this.data["checkboxes"].push(checkbox);
        this.data.tabs[path[0]][path[1]].elements.push(checkbox);
        this.data.items.push(checkbox);

        if(cb) cb(checkbox)
    };

    this.AddSubtab = function(name, cb) {
        if(this.data.tabs[name]) return ThrowError("AddSubtab", "You can't create 2 tabs with same name");

        this.data.tabs[name] = {
            General: {
                elements: [],
            },

            Other: {
                elements: [],
            }
        };

        if(cb) cb(this.data.tabs[name])
    };

    this.AddTheme = function(name, theme_object, cb) {
        if(this.themes[name]) return ThrowError("AddTheme", "You can't create 2 themes with same name");
        if(!theme_object) return ThrowError("AddTheme", "You should put theme settings: Object as second argument");
        
        this.themes[name] = theme_object;

        if(cb) cb(this.themes[name])
    };
    
    this.Preload();
    cb(this);

    return this;
};