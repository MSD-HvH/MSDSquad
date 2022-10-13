const Other = require("./useful.js");

/**
    И так начнёмс. Дата у нас 13.10.22
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
 * @constructor
 * 
 * @param { string } name Название меню
 * @param { function } cb Callback первым аргументом которого является this
 */
exports.CreateMenu = function(name, cb) {
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
        size: { width: 580, height: 480 }
    };
    
    return cb(this);
};
