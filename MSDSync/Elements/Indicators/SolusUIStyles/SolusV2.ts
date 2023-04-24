import { BaseStyle, type BaseStyleStructure } from "./BaseStyle.js";

const Arc = (
    x: number,
    y: number,
    radius: number,
    radius_inner: number,
    start_angle: number,
    end_angle: number,
    segments: number,
    color: [number, number, number, number]
) => {
    segments = 360 / segments;

    for (let i = start_angle; i < start_angle + end_angle; i = i + segments) {
        const rad = (i * Math.PI) / 180;
        const rad2 = ((i + segments) * Math.PI) / 180;

        const rad_cos = Math.cos(rad);
        const rad_sin = Math.sin(rad);

        const rad2_cos = Math.cos(rad2);
        const rad2_sin = Math.sin(rad2);

        const x1_inner = x + rad_cos * radius_inner;
        const y1_inner = y + rad_sin * radius_inner;

        const x1_outer = x + rad_cos * radius;
        const y1_outer = y + rad_sin * radius;

        const x2_inner = x + rad2_cos * radius_inner;
        const y2_inner = y + rad2_sin * radius_inner;

        const x2_outer = x + rad2_cos * radius;
        const y2_outer = y + rad2_sin * radius;

        Render.Polygon(
            [
                [x1_outer, y1_outer],
                [x2_outer, y2_outer],
                [x1_inner, y1_inner],
            ],
            color
        );
        Render.Polygon(
            [
                [x1_inner, y1_inner],
                [x2_outer, y2_outer],
                [x2_inner, y2_inner],
            ],
            color
        );
    }
};

export class SolusV2 extends BaseStyle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(options: BaseStyleStructure) {
        super(options);

        const { x, width, height } = options;

        this.x = x - 1;
        this.height = height + 1;
        this.width = width + 1;
    }

    /**
     * Нужно для рендера закругленного квадрата
     */
    public readonly FilledRectRounded = (options?: { color?: [number, number, number, number]; round_offset?: number }) => {
        const [x, y] = this.GetPosition();
        const [w, h] = this.GetSize();

        const color = options?.color || [0, 0, 0, 255];
        const round = Math.min(options?.round_offset || 5, h / 2);

        const seg = 12;

        Render.FilledRect(x + round, y, w - round * 2, h, color);
        Render.FilledRect(x, y + round, round, h - round * 2, color);
        Render.FilledRect(x + w - round, y + round, round, h - round * 2, color);

        Arc(x + round - 0.5, y + round - 0.5, round, 0, 180, 90, seg, color);
        Arc(x + w - round - 0.5, y + round - 0.5, round, 0, 270, 90, seg, color);
        Arc(x + round - 0.5, y + h - 0.5 - round, round, 0, 90, 90, seg, color);
        Arc(x + w - round - 0.5, y + h - 0.5 - round, round, 0, 0, 90, seg, color);

        return this;
    };

    /**
     * Нужно для рендера закругленной обводки
     */
    public readonly RectRounded = (options?: { color?: [number, number, number, number]; round_offset?: number }) => {
        const [x, y] = this.GetPosition();
        const [w, h] = this.GetSize();

        const color = options?.color || [110, 124, 171, 255];
        const round = Math.min(options?.round_offset || 5, h / 2);

        const seg = 12;

        Arc(x + round - 0.5, y + round - 0.5, round, round - 1, 180, 90, seg, color);
        Arc(x + w - round - 0.5, y + round - 0.5, round, round - 1, 270, 90, seg, color);
        Arc(x + round - 0.5, y + h - 0.5 - round, round, round - 1, 90, 90, seg, color);
        Arc(x + w - round - 0.5, y + h - 0.5 - round, round, round - 1, 0, 90, seg, color);

        Render.FilledRect(x, y + round, 1, h - round * 2, color);
        Render.FilledRect(x + w - 1, y + round, 1, h - round * 2, color);
        Render.FilledRect(x + round, y, w - round * 2, 1, color);
        Render.FilledRect(x + round, y - 1 + h, w - round * 2, 1, color);

        Arc(x + round - 0.5, y + round - 0.5, round, round - 1, 180, 90, seg, color);
        Arc(x + w - round - 0.5, y + round - 0.5, round, round - 1, 270, 90, seg, color);

        Render.FilledRect(x + round, y, w - round * 2, 1, color);

        return this;
    };

    /**
     * Рендерит тень
     *
     * **ЕСТ ПРИЛИЧНОЕ КОЛИЧЕСТВО ФПС**
     *
     * ---
     * @example
     * ```ts
     * const test = new SolusV2({ x: 100, y: 100, width: 100, height: 25 });
     *
     * const on_Draw = function () {
     *      test.RenderBox({ color: [110, 124, 171, 255], alpha: 155 });
     *      test.RenderGlow({ color: [110, 124, 171, 255] });
     * }
     *
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     */
    public readonly RenderGlow = (options?: { color?: [number, number, number, number]; round_offset?: number }) => {
        const [x, y] = this.GetPosition();
        const [w, h] = this.GetSize();

        const color = options?.color || [110, 124, 171, 255];
        const round = Math.min(options?.round_offset || 5, h / 2);
        const seg = 12;

        for (let i = 5; i > 0; i--) {
            const colorRect: [number, number, number, number] = [color[0], color[1], color[2], color[3] / i];
            const colorArc: [number, number, number, number] = [color[0], color[1], color[2], color[3] / (i * 2)];

            Arc(x + round - 0.5, y + round - 0.5, round + i, round - 1, 180, 90, seg, colorArc);
            Arc(x + w - round - 0.5, y + round - 0.5, round + i, round - 1, 270, 90, seg, colorArc);
            Arc(x + round - 0.5, y + h - 0.5 - round, round + i, round - 1, 90, 90, seg, colorArc);
            Arc(x + w - round - 0.5, y + h - 0.5 - round, round + i, round - 1, 0, 90, seg, colorArc);

            Render.FilledRect(x - i, y + round, 1, h - round * 2, colorRect);
            Render.FilledRect(x + i + w - 1, y + round, 1, h - round * 2, colorRect);
            Render.FilledRect(x + round, y - i, w - round * 2, 1, colorRect);
            Render.FilledRect(x + round, y + i - 1 + h, w - round * 2, 1, colorRect);
        }

        return this;
    };

    /**
     * Рендерит Solus V2 квадрта
     *
     * ---
     * @example
     * ```ts
     * const test = new SolusV2({ x: 100, y: 100, width: 100, height: 25 });
     *
     * const on_Draw = function () {
     *      test.RenderBox({ color: [110, 124, 171, 255], alpha: 155 });
     * }
     *
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     */
    public readonly RenderBox = (options?: {
        color?: [number, number, number, number];
        backgroundColor?: [number, number, number, number];
        round_offset?: number;
    }) => {
        const color = options?.color || [110, 124, 171, 255];
        const backgroundColor = options?.backgroundColor || [0, 0, 0, 140];
        const round_offset = options?.round_offset || 5;

        this.FilledRectRounded({ color: backgroundColor, round_offset });
        this.RectRounded({ color, round_offset });

        return this;
    };
}
