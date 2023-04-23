// Imports
const SolusV1 = require("../MSDSync/Elements/SolusUI/index.js").SolusV1;
const SolusV2 = require("../MSDSync/Elements/SolusUI/index.js").SolusV2;
const GamesenseStyle = require("../MSDSync/Elements/SolusUI/index.js").GamesenseStyle;

// Solus UI V1
const test = new SolusV1({ x: 100, y: 100, width: 160, height: 25 });

const on_Draw = function () {
    test.RenderBox({ lineHeight: 2, gradient: true });
};

// Solus UI V2
const test2 = new SolusV2({ x: 100, y: 140, width: 160, height: 25 });

const on_Draw2 = function () {
    test2.RenderBox({ color: [110, 124, 171, 255], alpha: 155 });
    test2.RenderGlow({ color: [110, 124, 171, 255] });
};

// Solus UI V2
const test3 = new SolusV2({ x: 100, y: 180, width: 160, height: 25 });

const on_Draw3 = function () {
    test3.RenderBox({ color: [110, 124, 171, 255], alpha: 155 });
};

// Gamesense
const test4 = new GamesenseStyle({ x: 100, y: 220, width: 160, height: 25 });

const on_Draw4 = function () {
    test4.RenderBox();
    test4.RenderGradient();
};

// Callbacks
Cheat.RegisterCallback("Draw", "on_Draw");
Cheat.RegisterCallback("Draw", "on_Draw2");
Cheat.RegisterCallback("Draw", "on_Draw3");
Cheat.RegisterCallback("Draw", "on_Draw4");
