import { Menu } from "./Core/Structures/Menu/Core";

const menu = new Menu("MSDSync", (menu) => {
	const toPrint = [
		[`\nWelcome, ${Cheat.GetUsername()} \n`, [255, 255, 255, 255]],
		[`Thanks for choosing  ${menu.name}! \n`, [163, 191, 115, 255]],
		["\n [ UPDATE LOG SOON ] \n", [163, 191, 115, 255]],
	];

	toPrint.forEach((tab: [string, number[]]) => {
		Cheat.PrintColor(tab[1], tab[0]);
	});
});

const onDraw = () => {
	menu.Begin();
};

Cheat.RegisterCallback("Draw", "onDraw");
