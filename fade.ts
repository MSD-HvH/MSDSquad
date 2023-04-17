const RenderFade = (options: { x: number; y: number; w: number; h: number; color: [number, number, number, number]; length: number }) => {
    const { x, y, w, h, color, length } = options;
    const [r, g, b, a] = color;

    for (let i = 0; i < 10; i++) {
        Render.Rect(x - i, y - i, w + i * 2, h + i * 2, [r, g, b, (60 - (60 / length) * i) * (a / 255)]);
    }
};

const on_draw = () => {
    const x = 400;
    const y = 100;
    const w = 140;
    const h = 30;
    const color: [number, number, number, number] = [255, 176, 41, 255];

    Render.FilledRect(x, y, w, h, [0, 0, 0, 155]);
    RenderFade({ x, y, w, h, color, length: 10 });
};

Cheat.RegisterCallback("Draw", "on_draw");
