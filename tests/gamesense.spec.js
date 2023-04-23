const GamesenseStyle = require("../MSDSync/Elements/SolusUI/index.js").GamesenseStyle;

const test = new GamesenseStyle({ x: 100, y: 100, width: 160, height: 25 });

const on_Draw = function () {
    test.RenderBox();
    test.RenderGradient();
};

Cheat.RegisterCallback("Draw", "on_Draw");
