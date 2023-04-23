const SolusV2 = require("../MSDSync/Elements/SolusUI/index.js").SolusV2;
const test = new SolusV2({ x: 100, y: 100, width: 160, height: 25 });

const on_Draw = function () {
    test.Box({ color: [110, 124, 171, 255], alpha: 255 });
};

Cheat.RegisterCallback("Draw", "on_Draw");
