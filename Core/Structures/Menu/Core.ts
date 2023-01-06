// #region Глобальные переменные
const screen = Render.GetScreenSize();
// #endregion
// #region Локальные переменные
const name = "MSDSync";
const build = Cheat.GetUsername() === "Mased" ? "dev" : "release";
// #endregion

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
	public build: "dev" | "release" = build;
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
