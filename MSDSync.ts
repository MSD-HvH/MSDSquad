import { SolusV1, SolusV2, GamesenseStyle } from "./MSDSync/Elements/Indicators/SolusUIStyles/index.js";
import { TimeFormat } from "./MSDSync/Modules/index.js";

const timeformat = new TimeFormat();

const on_Draw = () => {
    timeformat.SetDate();

    const x = 750;
    const y = 100;

    const font = Render.AddFont("Verdana", 7, 400);

    const time = timeformat.GetCurrentTime();
    const weekday = timeformat.GetWeekday();

    const str = [
        "onetap",
        "Mased",
        "delay: " + Math.floor((Local.Latency() * 1000) / 1.5) + "ms",
        "fps: " + 109,
        [time.hours, time.minutes, time.seconds].join(":") + " / " + weekday,
    ];

    const textSize = Render.TextSizeCustom(str.join(" | "), font);

    const width = 5 + textSize[0] + 5;
    const height = 5 + textSize[1] + 5;

    new SolusV1({ x: x, y: y, width: width, height: height }).RenderBox({ gradient: true, colorBackground: [0, 0, 0, 140] });
    Render.StringCustom(x + 5, y + 5, 0, str.join(" | "), [0, 0, 0, 255], font);
    Render.StringCustom(x + 4, y + 5, 0, str.join(" | "), [255, 255, 255, 255], font);

    new SolusV2({ x: x, y: y + 40, width: width, height: height }).RenderBox();
    Render.StringCustom(x + 5, y + 40 + 5, 0, str.join(" | "), [0, 0, 0, 255], font);
    Render.StringCustom(x + 4, y + 40 + 5, 0, str.join(" | "), [255, 255, 255, 255], font);

    new SolusV2({ x: x, y: y + 80, width: width, height: height }).RenderBox().RenderGlow();
    Render.StringCustom(x + 5, y + 80 + 5, 0, str.join(" | "), [0, 0, 0, 255], font);
    Render.StringCustom(x + 4, y + 80 + 5, 0, str.join(" | "), [255, 255, 255, 255], font);

    new GamesenseStyle({ x: x, y: y + 120, width: width, height: height }).RenderBox().RenderGradient();
    Render.StringCustom(x + 5, y + 120 + 5, 0, str.join(" | "), [0, 0, 0, 255], font);
    Render.StringCustom(x + 4, y + 120 + 5, 0, str.join(" | "), [255, 255, 255, 255], font);
};

Cheat.RegisterCallback("Draw", "on_Draw");
