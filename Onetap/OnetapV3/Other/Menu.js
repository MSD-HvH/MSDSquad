const Useful = require("./useful.js")
const screen = Render.GetScreenSize();
const build = "release";

/**
    И так начнёмс. Дата у нас 13.10.22 | 22:08
    Время наебашить меню для в3.

    Author: Mased
    Discord: Mased#1854
    Telegram: MasedMSD

    https://brokencore.club/members/1529
    https://yougame.biz/members/228508

    Текущая версия меню: 3.0.0

    Начнём с пару слов. Кфг системы не будет, джска сделана по фану.
    Если возникли вопрос то пишите в дискорд.
*/

/**
 * @param { string } name Название меню
 * @param { function= } cb Callback первым аргументом которого является this
 */
exports.CreateMenu = function(name, cb) {
    const error = function(method, text) {
        throw new Error(Useful.Other.FormatString("[Menu] {{method}}: {{text}}", { method, text }));
    };

    /** @private */
    const validation = function() {
        if(!name || typeof name !== "string") error("CreateMenu", "Menu should have name as first argument");
    };

    /** @private */
    this.options = {
        name: name,
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
        size: { width: 540, height: 440 }
    };

    /** @private */
    this.ui = {
        pos_x: ["Script items", this.options.name + "_x"].join(", "),
        pos_y: ["Script items", this.options.name + "_y"].join(", "),
        scale: ["Script items", this.options.name + "_scale"].join(", "),
        animSpeed: ["Script items", this.options.name + "_anim"].join(", "),
    };

    /** @private */
    this.Preload = function() {
        UI.AddSliderInt(this.options.name + "_x", 0, screen[0]);
        UI.AddSliderInt(this.options.name + "_y", 0, screen[1]);
        UI.AddSliderFloat(this.options.name + "_scale", 0.80, 1.5);
        UI.AddSliderFloat(this.options.name + "_anim", 0.5, 3);

        if(build != "dev") {
            UI.SetEnabled(this.options.name + "_x", 0);
            UI.SetEnabled(this.options.name + "_y", 0);
            UI.SetEnabled(this.options.name + "_scale", 0);
            UI.SetEnabled(this.options.name + "_anim", 0);
        };
    };

    this.GetOptions = function() {
        return this.options;
    };

    this.GetUI = function() {
        return this.ui;
    };

    this.GetScale = function() {
        return 1;
    };

    this.GetPosition = function() {
        return [UI.GetValue("Script items", this.options.name + "_x"), UI.GetValue("Script items", this.options.name + "_y")];
    };

    this.GetSize = function(scaleIncluded, animationIncluded) {
        return [this.options.size.width, this.options.size.height];
    };

    this.GetSource = function() {
        return this;
    };

    this.DrawUI = function(textScaling) {
        const position = this.GetPosition();
        const size = this.GetSize(true, true);
        const options = this.GetOptions();
        const scale = this.GetScale();

        const name = options.name;
        const colors = options.colors;
        const fonts = {
            logo: Render.AddFont("Verdana.ttf", 18 * (textScaling ? scale : 1), 400),
            tab: Render.AddFont("Verdana.ttf", 18 * (textScaling ? scale : 1), 400)
        };

        Render.FilledRect(position[0], position[1], size[0], size[1], colors.background); // Главное меню

        Render.FilledRect(position[0] + 10, position[1] + Render.TextSizeCustom(name, fonts.logo)[1] + 25, (size[0] - 30) / 2, size[1] - (Render.TextSizeCustom(name, fonts.logo)[1] + 35), colors.fields); // Левый Field
        Render.FilledRect(position[0] + 20 + (size[0] - 30) / 2, position[1] + Render.TextSizeCustom(name, fonts.logo)[1] + 25, (size[0] - 29) / 2, size[1] - (Render.TextSizeCustom(name, fonts.logo)[1] + 35), colors.fields); // Правый Field    

        Render.StringCustom(position[0] + 11, position[1] + 11, 0, name, colors.shadow, fonts.logo); // Тень логотипа
        Render.StringCustom(position[0] + 11, position[1] + 11, 0, name, colors.text, fonts.logo); // Сам логотип
    };
    
    validation();
    this.Preload();
    cb(this);

    return this;
};
