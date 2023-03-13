/**
 * Каллбэк функция дропдауна.
 */
type CallbackFunction = <N extends string, E extends string, A extends E[]> (checkbox: Dropdown<N, E, A>) => any;

export class Dropdown <N extends string, E extends string, A extends E[]> {
    /**
     * Имя дропдауна
     * 
     * @type {N}
     * 
     * @since 1.0.0
     */
    private name: N;

    /**
     * Элементы дропдауна
     * 
     * @type {A}
     * 
     * @since 1.0.0
     */
    private elements: A;

    /**
     * Текущее значение дропдауна.
     * 
     * @type {number}
     * 
     * @since 1.0.0
     */
    private value: number;

    /**
     * Каллбэк который срабатывает при изменении состояния дропдауна.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * test.AddCallback(function(dropdown) {
     *      Cheat.Print("Dropdown value: " + test.GetActiveElement() + "\n");
     * });
     * 
     * const on_Draw = function() {
     *      test.CheckCallback();
     * }
     * 
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     * 
     * @param {Dropdown<N, E, A>} dropdown дропдаун, значение которого изменилось.
     * @type {CallbackFunction}
     * @returns {any}
     * 
     * @since 1.0.0
     */
    private cb: CallbackFunction;

    constructor(name: N, elements: A) {
        /**
         * Проверяет, есть ли у дропдауна имя.
         */
        if(!name) throw new Error("[GUI | Dropdown] Cannot find name!");

        /**
         * Проверяет, есть ли у дропдауна элементы.
         */
        if(!elements) throw new Error("[GUI | Dropdown] Cannot find elements!");

        /**
         * Указывает имя дропдауна при создании.
         */
        this.name = name;

        /**
         * Указывает элементы дропдауна при создании.
         */
        this.elements = elements;

        /**
         * Указывает значение дропдауна при создании.
         */
        this.value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", this.name);

        return this;
    };

    /**
     * Возвращает путь дропдауна в виде массива.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("dropdown", ["Hello", "world"]).Create();
     * 
     * Cheat.Print(test.Path() + "\n"); // ["Misc", "JAVASCRIPT", "Script items", "dropdown"]
     * ```
     * ---
     * 
     * @returns {["Misc", "JAVASCRIPT", "Script items", N]}
     * 
     * @since 1.0.0
     */
    public readonly Path = (): ["Misc", "JAVASCRIPT", "Script items", N] => {
        return ["Misc", "JAVASCRIPT", "Script items", this.name];
    };

    /**
     * Возвращает текущее имя дропдауна.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("dropdown", ["Hello", "world"]).Create();
     * 
     * Cheat.Print(test.GetName()); // "dropdown"
     * ```
     * ---
     * 
     * @returns {N}
     * 
     * @since 1.0.0
     */
    public readonly GetName = (): N => {
        return this.name;
    };

    /**
     * Возвращает текущие элементы дропдауна.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("dropdown", ["Hello", "world"]).Create();
     * 
     * Cheat.Print(test.GetElements()); // ["Hello", "world"]
     * ```
     * ---
     * 
     * @returns {N}
     * 
     * @since 1.0.0
     */
    public readonly GetElements = (): A => {
        return this.elements;
    };

    /**
     * Возвращает текущее состояние дропдаун
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("dropdown", ["Hello", "world"]).Create();
     * 
     * Cheat.Print(test.GetValue().toString()); // 1 | 0
     * ```
     * ---
     * 
     * @returns {number}
     * 
     * @since 1.0.0
     */
    public readonly GetValue = (): number => {
        return UI.GetValue("Script items", this.name);
    };

    /**
     * Устанавливает значение дропдауна.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * test.SetValue(1); // "world"
     * ```
     * ---
     * 
     * @param {number} value Значение дропдауна
     * @returns {Dropdown<N, E, A>}
     * 
     * @since 1.0.0
     */
    public readonly SetValue = (value: number): Dropdown<N, E, A> => {
        UI.SetValue("Misc", "JAVASCRIPT", "Script items", this.name, value);

        this.value = value;

        return this;
    };

    /**
     * Устанавливает активный элемент.
     * 
     * @param {E} element Элемент который должен быть активен
     * @returns {Dropdown<N, E, A>}
     * 
     * @since 1.0.0
     */
    public readonly SetElementActive = (element: E): Dropdown<N, E, A> => {
        const index = this.elements.indexOf(element);

        UI.SetValue("Misc", "JAVASCRIPT", "Script items", this.name, index);

        return this;
    };

    /**
     * Проверяет активен ли элемент.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * Cheat.Print(test.ElementIsActive("hello") + "\n"); // true | false
     * ```
     * ---
     * 
     * @param {E} element
     * @returns {boolean}
     * 
     * @since 1.0.0
     */
    public readonly ElementIsActive = (element: E): boolean => {
        const index = this.elements.indexOf(element);
        const value = this.GetValue();

        return value === index;
    };

    /**
     * Возвращает название элемента по индексу
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * Cheat.Print(test.GetElement(0)); // "hello"
     * ```
     * ---
     * 
     * @param {number} index Индекс элемента который нужно получить
     * @returns {E}
     * 
     * @since 1.0.0
     */
    public readonly GetElement = (index: number): E => {
        return this.elements[index];
    };

    /**
     * Возвращает текущий активный элемент.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * Cheat.Print(test.GetActiveElement); // "hello" | "world"
     * ```
     * ---
     * 
     * @returns {E}
     * 
     * @since 1.0.0
     */
    public readonly GetActiveElement = (): E => {
        return this.elements[this.GetValue()];
    };

    /**
     * Создаёт дропдаун в самом вантапе.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * ```
     * ---
     * 
     * @returns {Dropdown<N, E, A>}
     * 
     * @since 1.0.0
     */
    public readonly Create = (): Dropdown<N, E, A> => {
        UI.AddDropdown.call(null, this.name, this.elements);

        return this;
    };

    /**
     * Задаёт дропдауну callback функцию.
     * Она будет выполняться при изменении значения дропдауна.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * test.AddCallback(function(dropdown) {
     *      Cheat.Print("Dropdown value: " + test.GetActiveElement() + "\n");
     * });
     * 
     * const on_Draw = function() {
     *      test.CheckCallback();
     * }
     * 
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     * 
     * @param {CallbackFunction} callbackFn
     * @returns {Dropdown<N, E, A>}
     * 
     * @since 1.0.0
     */
    public readonly AddCallback = (callbackFn: CallbackFunction): Dropdown<N, E, A> => {
        this.cb = callbackFn;

        return this;
    };

    /**
     * Проверяет изменилось ли значение дропдауна для запуска callback функции
     * 
     * ---
     * @example
     * ```ts
     * const test = new Dropdown("Hello", ["hello", "world"]).Create();
     * 
     * test.AddCallback(function(dropdown) {
     *      Cheat.Print("Dropdown value: " + test.GetActiveElement() + "\n");
     * });
     * 
     * const on_Draw = function() {
     *      test.CheckCallback();
     * }
     * 
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     * 
     * @since 1.0.0
     */
    public readonly CheckCallback = () => {
        if(this.value != this.GetValue()) {
            this.cb(this);

            this.value = this.GetValue();
        };
    };
};

/**
 * Более удобное создание дропдауна.
 * 
 * @author Mased
 * @version 1.0.0
 * 
 * Discord: Mased#1854
 */