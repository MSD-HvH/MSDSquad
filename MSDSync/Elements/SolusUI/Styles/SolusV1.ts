const HSVtoRGB = (h: number, s: number, v: number) => {
    let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

interface SolusV1Structure {
    /**
     * Позиция элемента по координате X
     *
     * @type {number}
     */
    x: number;
    /**
     * Позиция элемента по координате Y
     *
     * @type {number}
     */
    y: number;

    /**
     * Ширина элемента
     *
     * @type {number}
     */
    width: number;
    /**
     * Высота элемента
     *
     * @type {number}
     */
    height: number;
}

export class SolusV1 implements SolusV1Structure {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(options: SolusV1Structure) {
        const { x, y, width, height } = options;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Получить позицию элемента по координате X
     *
     * @returns {number} Текущая позиция по координате X
     */
    public readonly GetX = (): number => {
        return this.x;
    };

    /**
     * Установить позицию для элемента по координате X
     *
     * @param {V} value Значение X
     * @returns {number} Текущая позиция по координате X
     */
    public readonly SetX = <V extends number>(value: V): number => {
        this.x = value;

        return this.x;
    };

    /**
     * Получить позицию элемента по координате Y
     *
     * @returns {number} Текущая позиция по координате Y
     */
    public readonly GetY = (): number => {
        return this.y;
    };

    /**
     * Установить позицию для элемента по координате Y
     *
     * @param {V} value Значение Y
     * @returns {number} Текущая позиция по координате Y
     */
    public readonly SetY = <V extends number>(value: V): number => {
        this.y = value;

        return this.y;
    };

    /**
     * Получить текущую ширину элемента
     *
     * @returns {number} Текущая ширина
     */
    public readonly GetWidth = (): number => {
        return this.width;
    };

    /**
     * Установить ширину для элемента
     *
     * @param {V} value Значение ширины
     * @returns {number} Текущая ширина элемента
     */
    public readonly SetWidth = <V extends number>(value: V): number => {
        this.width = value;

        return this.width;
    };

    /**
     * Получить текущую высоту элемента
     *
     * @returns {number} Текущая высота
     */
    public readonly GetHeight = (): number => {
        return this.height;
    };

    /**
     * Установить высоту для элемента
     *
     * @param {V} value Значение высоты
     * @returns {number} Текущая высота элемента
     */
    public readonly SetHeight = <V extends number>(value: V): number => {
        this.height = value;

        return this.height;
    };

    /**
     * Получить текущую позицию элемента по X, Y
     *
     * @returns {[number, number]} X, Y
     */
    public readonly GetPosition = (): [number, number] => {
        return [this.GetX(), this.GetY()];
    };

    /**
     * Получить текущие размеры элемента
     *
     * @returns {[number, number]} Width, Height
     */
    public readonly GetSize = (): [number, number] => {
        return [this.GetWidth(), this.GetHeight()];
    };

    /**
     * Используется для рендера заднего фона
     *
     * @param {[number, number, number, number]} color Цвет заднего фона
     */
    public readonly Background = (color: [number, number, number, number] = [0, 0, 0, 155]) => {
        const [x, y] = this.GetPosition();
        const [w, h] = this.GetSize();

        Render.FilledRect(x, y, w, h, color);

        return this;
    };

    /**
     * Используется для рендера обычной линии
     *
     * @param {number} lineHeight Высота линии
     * @param {[number, number, number, number]} color Цвет линии
     */
    public readonly RenderLine = (lineHeight: number = 2, color: [number, number, number, number] = [110, 124, 172, 255]) => {
        const [x, y] = this.GetPosition();
        const [w] = this.GetSize();

        Render.FilledRect(x, y, w, lineHeight, color);

        return this;
    };

    /**
     * Используется для рендера анимированного градиента
     *
     * @param {number} lineHeight Высота градиент
     * @param {number} speed Скорость градиента
     */
    public readonly RenderGradient = (lineHeight: number = 2, speed?: number) => {
        const [x, y] = this.GetPosition();
        const [w] = this.GetSize();

        const color = HSVtoRGB(Globals.Realtime() * (speed || 0.1), 1, 1);

        Render.GradientRect(x, y, w / 2, lineHeight, 1, [color.g, color.b, color.r, 255], [color.r, color.g, color.b, 255]);
        Render.GradientRect(x + w / 2, y, w / 2, lineHeight, 1, [color.r, color.g, color.b, 255], [color.b, color.r, color.g, 255]);

        return this;
    };

    /**
     * Используется для рендера статического градиента
     *
     * @param {number} lineHeight Высота градиент
     */
    public readonly RenderFade = (lineHeight: number = 2) => {
        const [x, y] = this.GetPosition();
        const [w] = this.GetSize();

        const color = HSVtoRGB(0.9, 1, 1);

        Render.GradientRect(x, y, w / 2, 2, 1, [color.g, color.b, color.r, 255], [color.r, color.g, color.b, 255]);
        Render.GradientRect(x + w / 2, y, w / 2, 2, 1, [color.r, color.g, color.b, 255], [color.b, color.r, color.g, 255]);

        return this;
    };

    /**
     * Используется для рендера бокса
     *
     * ---
     * @example
     * ```ts
     * const test = new SolusV1({ x: 100, y: 100, width: 160, height: 25 });
     *
     * const on_Draw = function () {
     *      test.RenderBox();
     * };
     *
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     */
    public readonly RenderBox = (options?: {
        colorBackground?: [number, number, number, number];
        colorLine?: [number, number, number, number];
        lineHeight?: number;
        speed?: number;
        gradient?: boolean;
        animated?: boolean;
    }) => {
        const colorBackground = options?.colorBackground || [0, 0, 0, 155];
        const colorLine = options?.colorLine || [110, 124, 172, 255];
        const lineHeight = options?.lineHeight || 2;

        const gradientSpeed = options?.speed || 0.1;
        const isGradient = options?.gradient || false;
        const isGradientAnimated = options?.animated || false;

        this.Background(colorBackground);
        isGradient
            ? isGradientAnimated
                ? this.RenderGradient(lineHeight, gradientSpeed)
                : this.RenderFade(lineHeight)
            : this.RenderLine(lineHeight, colorLine);
    };
}
