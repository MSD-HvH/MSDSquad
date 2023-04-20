const Easings = require("../MSDSync/Modules/Easings.js").Easings;

const test = new Easings();

test.CreateNew("test", { start_value: 0, color: [255, 255, 255, 255] });

const on_Draw = function () {
    const color = test.UpdateColor("test", UI.IsMenuOpen() ? [242, 99, 97, 255] : [116, 242, 97, 255], 0.02);
    const yOffset = test.UpdateValue("test", UI.IsMenuOpen() ? 1 : 0, 0.02);

    Render.FilledRect(100, 100 * yOffset, 100, 100, color);
};

Cheat.RegisterCallback("Draw", "on_Draw");
