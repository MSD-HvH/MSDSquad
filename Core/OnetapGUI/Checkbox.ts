/**
 * Каллбэк функция чекбокса.
 */
type CallbackFunction = <N extends string> (checkbox: Checkbox <N>) => any;

class Checkbox <N extends string> {
    /**
     * Каллбэк который срабатывает при изменении состояния чекбокса.
     * 
     * ---
     * @example
     * ```ts
     * const checkbox = new Checkbox("Hello world").Create();
     * 
     * checkbox.AddCallback(function(checkbox) {
     *      Cheat.Print(checkbox.GetValue())
     * });
     * 
     * const on_Draw = function() {
     *      checkbox.CheckCallback();
     * };
     * 
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     * 
     * @param {Checkbox<N>} checkbox чекбокс на который нажимают.
     * @type {CallbackFunction}
     * @returns {any}
     * 
     * @since 1.0.0
     */
    public cb: CallbackFunction;

    /**
     * Название чекбокса.
     * 
     * @type {N}
     * 
     * @since 1.0.0
     */
    public name: N;

    /**
     * Текущий статус чекбокса.
     * 
     * @type {number}
     * 
     * @since 1.0.0
     */
    public value: 1 | 0;

    /**
     * Создаёт чекбокс с заданным названием.
     * Является более удобным чем просто `UI.AddCheckbox()`
     * 
     * ---
     * @example
     * ```ts
     * const test = new Checkbox("Hello world").Create();
     * ```
     * ---
     * 
     * @param {N} name Название чекбокса
     * @returns {Checkbox<N>}
     * 
     * @since 1.0.0
     */
    constructor(name: N) {
        /**
         * Проверяет, есть ли у чебокса имя.
         */
        if(!name) throw new Error("[GUI | Checkbox] Cannot find name!");

        /**
         * Указывает имя чекбокса при создании.
         */
        this.name = name;

        /**
         * Заполняет значение при создании.
         */
        this.value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", this.name);

        return this;
    };

    /**
     * Создаёт чекбокс в самом вантапе.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Checkbox("Hello world").Create();
     * ```
     * ---
     * 
     * @returns {Checkbox<N>}
     * 
     * @since 1.0.0
     */
    public readonly Create = (): Checkbox <N> => {
        UI.AddCheckbox.call(null, this.name);

        return this;
    };

    /**
     * Возвращает путь чекбокса в виде массива.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Checkbox("Hello world").Create();
     * 
     * Cheat.Print(test.Path() + "\n"); // ["Misc", "JAVASCRIPT", "Script items", "Hello world"]
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
     * Возвращает текущее имя чекбокса.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Checkbox("Hello world").Create();
     * 
     * Cheat.Print(test.GetName()); // "Hello world"
     * ```
     * ---
     * 
     * @returns {N}
     * 
     * @since 1.0.0
     */
    public readonly GetName = (): N => {
        return this.name
    };

    /**
     * Возвращает текущее состояние чекбокса
     * 
     * ---
     * @example
     * ```ts
     * const test = new Checkbox("Hello world").Create();
     * 
     * Cheat.Print(test.GetValue().toString()); // 1 или 0
     * ```
     * ---
     * 
     * @returns {number}
     * 
     * @since 1.0.0
     */
    public readonly GetValue = (): 1 | 0 => {
        return UI.GetValue("Script items", this.name);
    };

    /**
     * Устанавливает значение чекбокса.
     * 
     * ---
     * @example
     * ```ts
     * const test = new Checkbox("Hello world").Create();
     * 
     * test.SetValue(1);
     * 
     * Cheat.Print(test.GetValue().toString()); // 1
     * ```
     * ---
     * 
     * @param {number} value Значение чекбокса
     * @returns {Checkbox<N>}
     * 
     * @since 1.0.0
     */
    public readonly SetValue = (value: 1 | 0): Checkbox <N> => {
        UI.SetValue("Misc", "JAVASCRIPT", "Script items", this.name, value);

        return this;
    };

    /**
     * Задаёт чекбоксу callback функцию.
     * Она будет выполняться при изменении состояния чекбокса.
     * 
     * ---
     * @example
     * ```ts
     * const checkbox = new Checkbox("Hello world").Create();
     * 
     * checkbox.AddCallback(function(checkbox) {
     *      Cheat.Print(checkbox.GetValue())
     * });
     * 
     * const on_Draw = function() {
     *      checkbox.CheckCallback();
     * };
     * 
     * Cheat.RegisterCallback("Draw", "on_Draw");
     * ```
     * ---
     * 
     * @param {CallbackFunction} callbackFn
     * @returns {Checkbox<N>}
     * 
     * @since 1.0.0
     */
    public readonly AddCallback = (callbackFn: CallbackFunction): Checkbox <N> => {
        this.cb = callbackFn;

        return this;
    };

    /**
     * Функция для проверки значения чекбокса.
     * 
     * ---
     * @example
     * ```ts
     * const checkbox = new Checkbox("Hello world").Create();
     * 
     * checkbox.AddCallback(function(checkbox) {
     *      Cheat.Print(checkbox.GetValue())
     * });
     * 
     * const on_Draw = function() {
     *      checkbox.CheckCallback();
     * };
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
 * Более удобное создание чекбокса.
 * 
 * @author Mased
 * @version 1.0.0
 * 
 * Discord: Mased#1854
 */