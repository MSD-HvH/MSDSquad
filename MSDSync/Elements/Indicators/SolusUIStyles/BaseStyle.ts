export interface BaseStyleStructure {
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

export class BaseStyle implements BaseStyleStructure {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(options: BaseStyleStructure) {
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
}
