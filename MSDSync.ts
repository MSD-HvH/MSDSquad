var alpha = 0;

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function lerp(start_value, final_value, time) {
    time = clamp(Globals.Frametime() * (time * 175), 0, 1);
    return (final_value - start_value) * time + start_value;
}

const on_draw = function () {
    alpha = lerp(alpha, UI.IsMenuOpen() ? 1 : 0, 0.095);

    Cheat.Print(Number(alpha.toFixed(2)) + "\n");
    Render.FilledRect(100, 100, 100, 100, [255, 255, 255, 255 * Number(alpha.toFixed(2))]);
};

Cheat.RegisterCallback("Draw", "on_draw");
