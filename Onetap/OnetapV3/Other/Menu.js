const Useful = require("./useful.js");
const screen = Render.GetScreenSize();
const build = Cheat.GetUsername() === "Mased" ? "dev" : "release";

/**
 * @param {string} method Метод в котором появляется ошибка
 * @param {string} text Описание ошибки
 */
const throw_error = function(method, text) {
    throw new Error(Useful.Other.FormatString("[Menu] {{method}}: {{text}}", { method, text }));
};

/**
 * @typedef { Function } Menu
 * 
 * @param { string } name Имя меню
 */
exports.createMenu = function(name, cb) {
    const Validate = function() {
        if(!name) return throw_error("CreateMenu", "Menu should have name as first argument");
    };
    
    this.options = {
        name: name,
        build: build || "release",
        sizes: {
            menu: {
                width: 456,
                height: 340,
            },

            navigation: {
                width: 65
            },

            fields: {
                width: 180
            }
        }
    };

    this.themes = {
        dark: {
            theme: [32, 32, 32, 255],
            header: [31, 31, 31, 255],
            inner: [22, 22, 22, 255],
            stroke: [37, 37, 37, 255],
            icons: [74, 74, 74, 255],
            accent: [2, 121, 214, 255],

            text: [205, 205, 205, 255],
            shadow: [0, 0, 0, 255]
        }
    };

    this.data = {
        tabs: {},
        current_tab: "Rage",

        menu: {},

        checkboxes: [],
        buttons: [],
        colorpickers: [],
        dropdowns: [],
        multi_dropdowns: [],
        textboxes: [],
        hotkeys: [],

        items: [],
        active: []
    };

    this.animations = {
        menu: {
            box: {
                width: 1,
                height: 1,
            },

            subtabs: 1
        }
    }

    /** @private */
    this.Preload = function() {
        UI.AddSliderInt(this.options.name + "_x", 0, screen[0]);
        UI.AddSliderInt(this.options.name + "_y", 0, screen[1]);

        if(build !== "dev") {
            UI.SetEnabled(this.options.name + "_x", 0);
            UI.SetEnabled(this.options.name + "_y", 0);
        };
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
        const tab_keys = Object.keys(this.data.tabs);
        const pos = this.GetPosition();
        const colors = this.GetThemes();
        const data = this.GetData();
        const sizes = this.GetOptions().sizes;
        
        const font = Render.AddFont("Segoe UI", 16, 600);

        data.menu["navigation"] = {};
        data.menu["navigation"].add_height = 0;

        tab_keys.forEach(function(tab) {
            Render.StringCustom(pos[0] + 32, (pos[1] + 10) + data.menu["navigation"].add_height, 1, tab, data.current_tab === tab ? colors["dark"].accent : colors["dark"].text, font);

            if(
                Useful.Other.CursorBox(
                    Input.GetCursorPosition(),
                    pos[0] + 32, 
                    (pos[1] + 10) + data.menu["navigation"].add_height, 
                    pos[0] + 32 + Render.TextSizeCustom(tab, font)[0] + 5, 
                    (pos[1] + 10) + data.menu["navigation"].add_height + Render.TextSizeCustom(tab, font)[1] + 5
                ) && Input.IsKeyPressed(0x01)
            ) data["current_tab"] = tab

            data.menu["navigation"].add_height += Render.TextSizeCustom(tab, font)[1] + 10;

            if(data.menu["navigation"].add_height > (sizes.menu.height - 10)) sizes.menu.height = data.menu["navigation"].add_height + 10
        });
    };

    this.DrawAnimations = function() {
        const animations = this.GetAnimations();

        animations.menu["box"].height = Useful.Math.Lerp(animations.menu["box"].height, UI.IsMenuOpen() ? 1 : 0, 0.095)
    };

    this.DrawUI = function(DrawAnimations) {
        const options = this.GetOptions();
        const colors = this.GetThemes();
        const pos = this.GetPosition();
        const box_h_anim = (this.GetAnimations().menu["box"].height).toFixed(3);
        const sizes = options["sizes"];

        if(DrawAnimations) {
            this.DrawAnimations();
            if(box_h_anim <= 0.01) return;
        }

        Render.FilledRect(pos[0], pos[1], sizes["menu"].width, sizes["menu"].height * box_h_anim, colors["dark"].theme);

        Render.FilledRect(pos[0], pos[1], sizes["navigation"].width, sizes["menu"].height * box_h_anim, colors["dark"].inner);
        Render.Rect(pos[0], pos[1], sizes["navigation"].width, sizes["menu"].height * box_h_anim, colors["dark"].stroke);

        Render.FilledRect((pos[0] + sizes["navigation"].width) + 10, (pos[1] + 10), sizes["fields"].width, (sizes["menu"].height - 20) * box_h_anim, colors["dark"].inner);
        Render.Rect((pos[0] + sizes["navigation"].width) + 10, (pos[1] + 10), sizes["fields"].width, (sizes["menu"].height - 20) * box_h_anim, colors["dark"].stroke);

        Render.FilledRect((pos[0] + sizes["navigation"].width + sizes["fields"].width) + 20, (pos[1] + 10), sizes["fields"].width, (sizes["menu"].height - 20) * box_h_anim, colors["dark"].inner);
        Render.Rect((pos[0] + sizes["navigation"].width + sizes["fields"].width) + 20, (pos[1] + 10), sizes["fields"].width, (sizes["menu"].height - 20) * box_h_anim, colors["dark"].stroke);
    };

    this.AddSubtab = function(name) {
        if(this.data.tabs[name]) return throw_error("AddSubtab", "You can't create 2 tabs with same name");

        this.data.tabs[name] = {
            General: {
                elements: [],
                add_height: 0
            },

            Other: {
                elements: [],
                add_height: 0
            }
        };
    };

    Validate();
    this.Preload();
    cb(this);

    return this;
};
