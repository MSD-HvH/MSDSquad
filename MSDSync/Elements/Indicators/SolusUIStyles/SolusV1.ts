import { BaseStyle, type BaseStyleStructure } from "./BaseStyle.js";

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

export class SolusV1 extends BaseStyle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(options: BaseStyleStructure) {
        super(options);

        const { width, height } = options;

        this.width = width - 1;
    }

    /**
     * Используется для рендера заднего фона
     */
    public readonly RenderBackground = (options: { color: [number, number, number, number] }) => {
        const [x, y] = this.GetPosition();
        const [w, h] = this.GetSize();
        const color = options?.color || [0, 0, 0, 155];

        Render.FilledRect(x, y, w, h, color);

        return this;
    };

    /**
     * Используется для рендера обычной линии
     */
    public readonly RenderLine = (options: { lineHeight: number; color: [number, number, number, number] }) => {
        const [x, y] = this.GetPosition();
        const [w] = this.GetSize();
        const lineHeight = options?.lineHeight || 2;
        const color = options?.color || [110, 124, 172, 255];

        Render.FilledRect(x, y, w, lineHeight, color);

        return this;
    };

    /**
     * Используется для рендера анимированного градиента
     */
    public readonly RenderGradient = (options: { lineHeight: number; speed?: number }) => {
        const [x, y] = this.GetPosition();
        const [w] = this.GetSize();
        const lineHeight = options?.lineHeight || 2;
        const speed = options?.speed || 0.1;

        const color = HSVtoRGB(Globals.Realtime() * speed, 1, 1);

        Render.GradientRect(x, y, w / 2, lineHeight, 1, [color.g, color.b, color.r, 255], [color.r, color.g, color.b, 255]);
        Render.GradientRect(x + w / 2, y, w / 2, lineHeight, 1, [color.r, color.g, color.b, 255], [color.b, color.r, color.g, 255]);

        return this;
    };

    /**
     * Используется для рендера статического градиента
     */
    public readonly RenderFade = (options: { lineHeight: number }) => {
        const [x, y] = this.GetPosition();
        const [w] = this.GetSize();
        const lineHeight = options?.lineHeight || 2;

        const color = HSVtoRGB(0.9, 1, 1);

        Render.GradientRect(x, y, w / 2, lineHeight, 1, [color.g, color.b, color.r, 255], [color.r, color.g, color.b, 255]);
        Render.GradientRect(x + w / 2, y, w / 2, lineHeight, 1, [color.r, color.g, color.b, 255], [color.b, color.r, color.g, 255]);

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

        this.RenderBackground({ color: colorBackground });
        isGradient
            ? isGradientAnimated
                ? this.RenderGradient({ lineHeight, speed: gradientSpeed })
                : this.RenderFade({ lineHeight })
            : this.RenderLine({ lineHeight, color: colorLine });

        return this;
    };
}
