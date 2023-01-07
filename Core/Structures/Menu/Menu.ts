interface MenuOptions {
	build?: string;
}

export class Menu<N extends string, O extends MenuOptions> {
	public name: string;
	public build: string;
	public position: number[] = [150, 150];

	public checkboxes: any[] = [];
	public buttons: any[] = [];
	public dropdowns: any[] = [];
	public multi_dropdowns: any[] = [];
	public color_pickers: any[] = [];

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
}
