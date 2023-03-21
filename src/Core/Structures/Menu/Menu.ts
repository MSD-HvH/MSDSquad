import { NewAnimation, GetAnimation } from "./Utilities";

interface MenuOptions {
	build?: string;
}

export class Menu<N extends string, O extends MenuOptions> {
	// #region Переменные
	private name: string;
	private build: string;
	private position: number[] = [150, 150];

	private checkboxes: any[] = [];
	private buttons: any[] = [];
	private dropdowns: any[] = [];
	private multi_dropdowns: any[] = [];
	private color_pickers: any[] = [];
	// #endregion

	constructor(name: N, options?: O) {
		this.name = name;
		this.build = options.build || "release";

		return this;
	}

	public readonly GetSource = () => {
		return this;
	};

	public readonly GetName = () => {
		return this.name;
	};

	public readonly SetName = <N extends string>(name: N): N => {
		this.name = name;

		return name;
	};

	public readonly GetBuild = () => {
		return this.build;
	};

	public readonly SetBuild = <B extends string>(build: B): B => {
		this.build = build;

		return build;
	};

	public readonly GetPosition = () => {
		return this.position;
	};

	public readonly SetPosition = <X extends number, Y extends number>(x: X, y: Y): number[] => {
		this.position = [x, y];

		return [x, y];
	};

	public readonly GetElements = () => {
		return {
			checkboxes: this.checkboxes,
			buttons: this.buttons,
			dropdowns: this.dropdowns,
			multi_dropdowns: this.multi_dropdowns,
			color_pickers: this.color_pickers,
		};
	};

	public readonly CreateMenu = () => {};
}

const test = new Menu("MSDSync");
