import { OtherLIB } from "../Modules";

const screen = Render.GetScreenSize();
const build = Cheat.GetUsername() === "Mased" ? "dev" : "release";

/**
 * @param method Метод в котором появляется ошибка
 * @param text Описание ошибки
 */
export const ThrowError = function(method: string, text: string) {
    throw new Error(OtherLIB.FormatString("[Menu] {{method}}: {{text}}", { method, text }));
};

export class Menu {
    /**
     * Имя самого меню
     */
    public readonly name: string;
    /**
     * Текущий билд меню.
     * Если ник в чите - это Mased. То build будет dev.
     * В других случаях release
     */
    public readonly build: typeof build;
    public readonly ThrowError: typeof ThrowError;

    constructor (name: string) {
        if(!name) return ThrowError("CreateMenu", "Menu should have a name as the first argument");

        this.name = name;
        this.build = build;
        this.ThrowError = ThrowError;

        return this;
    };

    /**
     * Используется чтобы предзагрузить UI элементы для взаимодействия с меню.
     */
    private readonly Preload = () => {
        UI.AddSliderInt(this.name + "_x", 0, screen[0]);
        UI.AddSliderInt(this.name + "_y", 0, screen[1]);
        UI.AddSliderFloat(this.name + "_scale", 0.5, 3);

        if(this.build !== "dev") {
            UI.SetEnabled("Script items", this.name + "_x", false);
            UI.SetEnabled("Script items", this.name + "_y", false);
            UI.SetEnabled("Script items", this.name + "_scale", false);
        };
    };

    /**
     * ОБЯЗАТЕЛЬНО!
     * Использовать перед использованием меню
     * 
     * @example
     * ```ts
     * const MenuLIB = require("./Menu.js");
     * 
     * const menu = new MenuLIB.Menu("MSDSync").CreateMenu();
     * ```
     */
    public readonly CreateMenu = () => {
        this.Preload();

        return this;
    };
};
