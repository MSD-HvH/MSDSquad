const Drag = require("./MSDSync/Modules/Drag.js").Drag;
const screen = Render.GetScreenSize();

const test_x = UI.AddSliderInt("test_x", 0, screen[0]);
const test_y = UI.AddSliderInt("test_y", 0, screen[1]);

const drag = new Drag({ name: "test", x_slider: test_x, y_slider: test_y, width: 160, height: 20 });

const on_draw = function () {
    // const coordinates = drag.GetCoordinates();
    const size = drag.GetSize();

    const x = UI.GetValue("Script items", "test_x");
    const y = UI.GetValue("Script items", "test_y");

    const w = size[0];
    const h = size[1];

    drag.CreateDrag();
    drag.DrawOutline([180, 255, 175, 255]);

    Render.FilledRect(x, y, w, h, [255, 255, 255, 255]);
};

Cheat.RegisterCallback("Draw", "on_draw");
