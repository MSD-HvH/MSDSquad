const Clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(min, value), max);
};

export interface EasingItem {
    /**
     * Числовой значение элемента
     *
     * @type {number}
     */
    value: number;
    /**
     * RGBA значение элемента
     *
     * @type {[number, number, number, number]}
     */
    color: [number, number, number, number];
}

/**
 * Класс для с анимациями
 *
 * ---
 * @example
 * ```ts
 * const test = new Easings();
 *
 * test.CreateNew("test", { start_value: 0, color: [255, 255, 255, 255] });
 *
 * const on_Draw = function () {
 *     const color = test.UpdateColor("test", UI.IsMenuOpen() ? [242, 99, 97, 255] : [116, 242, 97, 255], 0.02);
 *     const yOffset = test.UpdateValue("test", UI.IsMenuOpen() ? 1 : 0, 0.02);
 *
 *     Render.FilledRect(100, 100 * yOffset, 100, 100, color);
 * };
 *
 * Cheat.RegisterCallback("Draw", "on_Draw");
 * ```
 * ---
 *
 * @class
 * @see https://easings.net/
 */
export class Easings {
    public readonly list: { [key: string]: EasingItem } = {};

    constructor() {}

    /**
     * Функция для создания элемента easing
     *
     * @param {string} name Имя элемента
     * @param {{start_value?: number; color?: [number, number, number, number]}} options Данные элемента
     */
    public readonly CreateNew = (
        name: string,
        options: { start_value?: number; color?: [number, number, number, number] } = { start_value: 0, color: [255, 255, 255, 255] }
    ) => {
        const { start_value, color } = options;
        if (!this.list[name]) this.list[name] = { value: start_value, color: color };
    };

    /**
     * Функция для лёрпа числа
     *
     * @param {number} start_value Начальное значение
     * @param {number} final_value Конечное значение
     * @param {number} time Время
     * @returns {number}
     */
    public readonly Lerp = (start_value: number, final_value: number, time: number = 0.095): number => {
        time = Clamp(Globals.Frametime() * time * 175, 0.01, 1);

        return (final_value - start_value) * time + start_value;
    };

    /**
     * Функция для анимации числового значения элемента
     *
     * @param {number} name Имя элемента
     * @param {number} final_value Конечное значение
     * @param {number} time Время
     * @returns {number}
     */
    public readonly UpdateValue = (name: string, final_value: number, time?: number): number => {
        return (this.list[name].value = this.Lerp(this.list[name].value, final_value, time));
    };

    /**
     * Функция для анимации цвета элемента
     *
     * @param name Имя элемента
     * @param final_color Конечный цвет
     * @param time Время
     * @returns {[number, number, number, number]}
     */
    public readonly UpdateColor = (
        name: string,
        final_color: [number, number, number, number],
        time?: number
    ): [number, number, number, number] => {
        this.list[name].color[0] = this.Lerp(this.list[name].color[0], final_color[0], time);
        this.list[name].color[1] = this.Lerp(this.list[name].color[1], final_color[1], time);
        this.list[name].color[2] = this.Lerp(this.list[name].color[2], final_color[2], time);
        this.list[name].color[3] = this.Lerp(this.list[name].color[3], final_color[3], time);

        return this.list[name].color;
    };
}
