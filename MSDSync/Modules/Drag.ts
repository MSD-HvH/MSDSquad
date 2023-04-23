type OnetapPath = ["Misc", "JAVASCRIPT", "Script items", string];

export interface DragStructure {
    /**
     * Имя элемента
     *
     * @type {string}
     */
    name: string;

    /**
     * Перемещается ли элемент сейчас
     *
     * @type {boolean}
     */
    is_dragging: boolean;
    /**
     * Кешированная позиция перемещения
     *
     * @type {[number, number]}
     */
    drag_position: [number, number];

    /**
     * Путь до ползунка который отвечает за x координату элемента
     *
     * @type {OnetapPath}
     */
    x_slider: OnetapPath;
    /**
     * Путь до ползунка который отвечает за y координату элемента
     *
     * @type {OnetapPath}
     */
    y_slider: OnetapPath;

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

const Lerp = <A extends number, B extends number, P extends number>(a: A, b: B, percentage: P) => {
    return a + (b - a) * percentage;
};

export class Drag<N extends string, X extends OnetapPath, Y extends OnetapPath, W extends number, H extends number>
    implements DragStructure
{
    public readonly name: N;

    public is_dragging: boolean = false;
    public drag_position: [number, number] = [0, 0];

    public outline_alpha: number = 0;

    public width: W;
    public height: H;

    public readonly x_slider: X;
    public readonly y_slider: Y;

    constructor(options: { name: N; x_slider: X; y_slider: Y; width: W; height: H }) {
        const { name, x_slider, y_slider, width, height } = options;

        this.name = name;

        this.x_slider = x_slider;
        this.y_slider = y_slider;

        this.width = width;
        this.height = height;
    }

    /**
     * Получить имя элемента
     *
     * @returns {N} Имя элемента
     */
    public readonly GetName = (): N => {
        return this.name;
    };

    /**
     * Получить ширину элемента
     *
     * @returns {number} Ширина элемента
     */
    public readonly GetWidth = (): number => {
        return this.width;
    };

    /**
     * Установить ширину элемента
     *
     * @param {NW} width Новая ширина
     */
    public readonly SetWidth = <NW extends number>(width: NW) => {
        (this.width as unknown as NW) = width;
    };

    /**
     * Получить высоту элемента
     *
     * @returns {number} Высота элемента
     */
    public readonly GetHeight = (): number => {
        return this.height;
    };

    /**
     * Установать высоту элемента
     *
     * @param {NH} height Новая высота
     */
    public readonly SetHeight = <NH extends number>(height: NH) => {
        (this.height as unknown as NH) = height;
    };

    /**
     * Получить ширину и высоту
     *
     * @returns {[number, number]} Ширина и высота
     */
    public readonly GetSize = (): [number, number] => {
        return [this.GetWidth(), this.GetHeight()];
    };

    /**
     * Получить X координату элемента
     *
     * @returns {number} X координата
     */
    public readonly GetX = (): number => {
        return UI.GetValue(...(this.x_slider as OnetapPath));
    };

    /**
     * Установить X координату для элемента
     *
     * @param {V} value Новая X координата
     * @returns {void}
     */
    public readonly SetX = <V extends number>(value: V): void => {
        return UI.SetValue(...(this.x_slider as OnetapPath), value);
    };

    /**
     * Получить Y координату элемента
     *
     * @returns {number} Y координата
     */
    public readonly GetY = (): number => {
        return UI.GetValue(...(this.y_slider as OnetapPath));
    };

    /**
     * Установить Y координату для элемента
     *
     * @param {V} value Новая Y координата
     * @returns {void}
     */
    public readonly SetY = <V extends number>(value: V): void => {
        return UI.SetValue(...(this.y_slider as OnetapPath), value);
    };

    /**
     * Получить координаты элемента
     *
     * @returns {[number, number]} X, Y
     */
    public readonly GetCoordinates = (): [number, number] => {
        return [this.GetX(), this.GetY()];
    };

    /**
     * Проверяет то, перемещается ли сейчас элемент
     *
     * @returns {boolean}
     */
    public readonly IsDragging = (): boolean => {
        return this.is_dragging;
    };

    /**
     * Проверяет то, находится ли мышка сейчас в зоне элемента
     *
     * @returns {boolean}
     */
    public readonly IsInBounds = (): boolean => {
        const [mouse_x, mouse_y] = Input.GetCursorPosition();
        const [x, y] = this.GetCoordinates();
        const [w, h] = this.GetSize();

        return mouse_x > x && mouse_y > y && mouse_x < x + w && mouse_y < y + h;
    };

    /**
     * Функция для перемещения элемента
     */
    public readonly CreateDrag = (): void => {
        const [mouse_x, mouse_y] = Input.GetCursorPosition();
        const isKeyPressed = Input.IsKeyPressed(0x01);
        const isInBounds = this.IsInBounds();
        const isDragging = this.IsDragging();
        const [x, y] = this.GetCoordinates();

        if (isInBounds && isKeyPressed && !isDragging) {
            this.drag_position = [x - mouse_x, y - mouse_y];
            this.is_dragging = true;
        }

        if (!isKeyPressed) this.is_dragging = false;

        if (UI.IsMenuOpen() && isDragging) {
            this.SetX(mouse_x + this.drag_position[0]);
            this.SetY(mouse_y + this.drag_position[1]);
        }
    };

    /**
     * Функция для рендера обводки вокруг элемента когда мышка находится в его зоне.
     */
    public readonly DrawOutline = (
        options: {
            color?: [number, number, number, number];
            radius?: number;
        } = {
            color: [255, 255, 255, 75],
            radius: 5,
        }
    ) => {
        if (!UI.IsMenuOpen()) return;

        const isInBounds = this.IsInBounds();
        const [x, y] = this.GetCoordinates();
        const [w, h] = this.GetSize();
        const color = options.color || [255, 255, 255, 75];
        const radius = options.radius || 5;
        const [r, g, b, a] = color;

        this.outline_alpha = Lerp(this.outline_alpha, isInBounds && !this.is_dragging ? 1 : 0, 0.3);
        Render.Rect(x - radius, y - radius, w + radius * 2, h + radius * 2, [r, g, b, a * this.outline_alpha]);

        return this;
    };
}
