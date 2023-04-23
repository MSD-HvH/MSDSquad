const SolusV2 = require("../MSDSync/Elements/Indicators/index.js").SolusV2;
const test = new SolusV2({ x: 100, y: 100, width: 160, height: 25 });

const on_Draw = function () {
    test.RenderBox({ color: [110, 124, 171, 255], alpha: 155 });
};

Cheat.RegisterCallback("Draw", "on_Draw");
