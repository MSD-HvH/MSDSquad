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

interface SolusV2Structure {
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

export class SolusV2 implements SolusV2Structure {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(options: SolusV2Structure) {
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
     * **ЕСТЬ ПРИЛИЧНОЕ КОЛИЧЕСТВО ФПС**
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
    public readonly RenderGlow = (options?: { color?: [number, number, number, number]; round_offset?: number; alpha?: number }) => {
        const [x, y] = this.GetPosition();
        const [w, h] = this.GetSize();

        const color = options?.color || [110, 124, 171, 255];
        const round = Math.min(options?.round_offset || 5, h / 2);

        const alpha = options.alpha || 155;

        const seg = 12;

        for (let i = 5; i > 0; i--) {
            const colorRect = [color[0], color[1], color[2], alpha / i];
            const colorArc = [color[0], color[1], color[2], alpha / (i * 2)] as [number, number, number, number];

            Arc(x + round - 0.5, y + round - 0.5, round + i, round - 1, 180, 90, seg, colorArc);
            Arc(x + w - round - 0.5, y + round - 0.5, round + i, round - 1, 270, 90, seg, colorArc);
            Arc(x + round - 0.5, y + h - 0.5 - round, round + i, round - 1, 90, 90, seg, colorArc);
            Arc(x + w - round - 0.5, y + h - 0.5 - round, round + i, round - 1, 0, 90, seg, colorArc);

            Render.FilledRect(x - i, y + round, 1, h - round * 2, colorRect);
            Render.FilledRect(x + i + w - 1, y + round, 1, h - round * 2, colorRect);
            Render.FilledRect(x + round, y - i, w - round * 2, 1, colorRect);
            Render.FilledRect(x + round, y + i - 1 + h, w - round * 2, 1, colorRect);
        }
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
    public readonly RenderBox = (options: { color: [number, number, number, number]; alpha: number; round_offset?: number }) => {
        const { color, alpha } = options;
        const round_offset = options?.round_offset || 5;

        this.FilledRectRounded({ color: [0, 0, 0, alpha], round_offset });
        this.RectRounded({ color, round_offset });

        return this;
    };
}
