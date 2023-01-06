// #region Функциия для работы с битами
export const bit = {
	/**
	 * Побитовое И
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	band: <F extends number, S extends number>(a: F, b: S): number => a & b,
	/**
	 * Побитовый сдвиг влево
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	lshift: <F extends number, S extends number>(a: F, b: S): number => a << b,
	/**
	 * Побитовый сдвиг вправо
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	rshift: <F extends number, S extends number>(a: F, b: S): number => a >> b,
	/**
	 * Побитовое НЕ
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	bnot: <F extends number>(a: F): number => ~a,
};
// #endregion
// #region Побитовые переменные
export const IN_ATTACK = bit.lshift(1, 0);
export const IN_JUMP = bit.lshift(1, 1);
export const IN_DUCK = bit.lshift(1, 2);
export const IN_FORWARD = bit.lshift(1, 3);
export const IN_BACK = bit.lshift(1, 4);
export const IN_USE = bit.lshift(1, 5);
export const IN_CANCEL = bit.lshift(1, 6);
export const IN_LEFT = bit.lshift(1, 7);
export const IN_RIGHT = bit.lshift(1, 8);
export const IN_MOVELEFT = bit.lshift(1, 9);
export const IN_MOVERIGHT = bit.lshift(1, 10);
export const IN_ATTACK2 = bit.lshift(1, 11);
export const IN_RUN = bit.lshift(1, 12);
export const IN_RELOAD = bit.lshift(1, 13);
export const IN_ALT1 = bit.lshift(1, 14);
export const IN_ALT2 = bit.lshift(1, 15);
export const IN_SCORE = bit.lshift(1, 16);
export const IN_SPEED = bit.lshift(1, 17);
export const IN_WALK = bit.lshift(1, 18);
export const IN_ZOOM = bit.lshift(1, 19);
export const IN_WEAPON1 = bit.lshift(1, 20);
export const IN_WEAPON2 = bit.lshift(1, 21);
export const IN_BULLRUSH = bit.lshift(1, 22);
// #endregion
// #region Переменные системы клавиш
export const pressedKeys: boolean[] | number[] = [];
export const lastPressedKeys: boolean[] | number[] = [];

export let cursorPosition = Input.GetCursorPosition();
export let cacheCursorPosition = Input.GetCursorPosition();
// #endregion
// #region Система клавиш
export const input = {
	/**
	 * Возвращает текущую позицию курсора и кеширует её.
	 */
	getCursorPosition: () => {
		if (!Input.IsKeyPressed(0x01)) cursorPosition = cacheCursorPosition;

		cacheCursorPosition = Input.GetCursorPosition();

		return cursorPosition;
	},
	/**
	 * Обновляет все нажатые клавиши
	 */
	update: () => {
		for (let i = 1; i < 255; i++) {
			lastPressedKeys[i] = pressedKeys[i];
			pressedKeys[i] = Input.IsKeyPressed(i);
		}
	},
	/**
	 * Проверяет нажати ли клавиша
	 *
	 * @param key Клавиша
	 */
	isKeyPressed: <K extends number>(key: K) => pressedKeys[key] && !lastPressedKeys[key],
	/**
	 * Проверяет отжата ли клавиша
	 *
	 * @param key Клавиша
	 */
	isKeyReleased: <K extends number>(key: K) => !pressedKeys[key] && lastPressedKeys[key],
};
// #endregion
// #region Меню
interface ColorTheme {
	MAIN: number[];
	TAB_NOT_SELECTED: number[];

	MENU_SIDEBAR: number[];
	MENU_MAIN: number[];

	TEXT_SECOND: number[];
	ITEM_NAME: number[];
	ITEM_ENABLED: number[];

	CHECKBOX_DISABLED?: number[];
	CHECKBOX_ENABLED?: number[];
	CHECKBOX_OUTLINE: number[];

	SLIDER_RECT?: number[];
	SLIDER_ENABLED?: number[];
	SLIDER_OUTLINE: number[];

	DROPDOWN_RECT?: number[];
	DROPDOWN_OUTLINE: number[];

	COLORPICKER_OUTLINE: number[];
	COLORPICKER_PICKER?: number[];

	BUTTON_RECT?: number[];
	BUTTON_OUTLINE: number[];
}

export class Menu {
	public name: string;
	public position: number[] = [150, 150];
	public items: any[] = [];

	public colors = {
		MENU_SIDEBAR: [0, 0, 0, 0],
		current_theme: "Default",
	};

	public color_theme: { [name: string]: ColorTheme } = {};

	public current_tab: number = 0;
	public dpi_scale: number = 1;
	public readonly dpi_scales: number[] = [0.5, 1, 1.5, 2];

	constructor(name: string, cb?: (menu: typeof Menu.prototype) => typeof Menu.prototype) {
		this.name = name;

		this.CreateTheme("Default", {
			MAIN: [250, 166, 24, 255],
			TAB_NOT_SELECTED: [124, 124, 124, 255],

			MENU_SIDEBAR: [13, 13, 17, 255],
			MENU_MAIN: [18, 18, 23, 255],

			TEXT_SECOND: [124, 124, 124, 255],
			ITEM_NAME: [124, 124, 124, 255],
			ITEM_ENABLED: [230, 230, 230, 255],

			CHECKBOX_DISABLED: [13, 13, 17, 255],
			CHECKBOX_ENABLED: [250, 166, 24, 255],
			CHECKBOX_OUTLINE: [32, 32, 33, 255],

			SLIDER_RECT: [13, 13, 17, 255],
			SLIDER_ENABLED: [250, 166, 24, 255],
			SLIDER_OUTLINE: [32, 32, 33, 255],

			DROPDOWN_RECT: [13, 13, 17, 255],
			DROPDOWN_OUTLINE: [32, 32, 33, 255],

			COLORPICKER_OUTLINE: [32, 32, 33, 255],
			COLORPICKER_PICKER: [13, 13, 17, 255],

			BUTTON_RECT: [13, 13, 17, 255],
			BUTTON_OUTLINE: [32, 32, 33, 255],
		});

		Cheat.Print(`[Menu] ${name} loaded!`);

		return cb(this);
	}

	public readonly GetSource = () => {
		return this;
	};

	public readonly GetName = () => {
		return this.name;
	};

	public readonly SetName = <N extends string>(name: N): N => {
		return (this.name = name);
	};

	public readonly GetPosition = () => {
		return this.position;
	};

	public readonly SetPosition = <X extends number, Y extends number>(x: X, y: Y) => {
		this.position = [x, y];
	};

	public readonly GetThemes = () => {
		return this.color_theme;
	};

	public readonly CreateTheme = <N extends string, S extends ColorTheme>(name: N, settings: S) => {
		const {
			MAIN,
			TAB_NOT_SELECTED,
			MENU_SIDEBAR,
			MENU_MAIN,
			TEXT_SECOND,
			ITEM_NAME,
			ITEM_ENABLED,
			CHECKBOX_DISABLED,
			CHECKBOX_ENABLED,
			CHECKBOX_OUTLINE,
			SLIDER_RECT,
			SLIDER_ENABLED,
			SLIDER_OUTLINE,
			DROPDOWN_RECT,
			DROPDOWN_OUTLINE,
			COLORPICKER_OUTLINE,
			COLORPICKER_PICKER,
			BUTTON_RECT,
			BUTTON_OUTLINE,
		} = settings;

		this.color_theme[name] = {
			MAIN,
			TAB_NOT_SELECTED,
			MENU_SIDEBAR,
			MENU_MAIN,
			TEXT_SECOND,
			ITEM_NAME,
			ITEM_ENABLED,
			CHECKBOX_DISABLED: CHECKBOX_DISABLED || MENU_SIDEBAR,
			CHECKBOX_ENABLED: CHECKBOX_ENABLED || MAIN,
			CHECKBOX_OUTLINE,
			SLIDER_RECT: SLIDER_RECT || MENU_SIDEBAR,
			SLIDER_ENABLED: SLIDER_ENABLED || MAIN,
			SLIDER_OUTLINE,
			DROPDOWN_RECT: DROPDOWN_RECT || MENU_SIDEBAR,
			DROPDOWN_OUTLINE,
			COLORPICKER_OUTLINE,
			COLORPICKER_PICKER: COLORPICKER_PICKER || MENU_SIDEBAR,
			BUTTON_RECT: BUTTON_RECT || MENU_SIDEBAR,
			BUTTON_OUTLINE,
		};
	};
}
