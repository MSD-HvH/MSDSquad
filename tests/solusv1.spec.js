const SolusV1 = require("../MSDSync/Elements/SolusUI/index.js").SolusV1;
const test = new SolusV1({ x: 100, y: 100, width: 160, height: 25 });

const on_Draw = function () {
    test.Box({ lineHeight: 2 });
};

Cheat.RegisterCallback("Draw", "on_Draw");
