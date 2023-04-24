import { GamesenseStyle, SolusV1, SolusV2 } from "./MSDSync/Elements/Indicators/SolusUIStyles/index.js";
import { TimeFormat, Easings } from "./MSDSync/Modules/index.js";

const cheatNameTextbox = UI.AddTextbox("Cheat Name");
const combobox = UI.AddMultiDropdown("Watermark Settings", ["Cheat name", "Username", "Ping", "FPS", "Time", "Weekday"]);
const styleCombobox = UI.AddDropdown("Watermark Style", ["Solus V1", "Solus V2", "Gamesense"]);
const glow = UI.AddCheckbox("Glow");
const roundingSlider = UI.AddSliderInt("Rounding", 0, 12);
UI.SetValue(...glow, false);
UI.SetValue(...roundingSlider, false);
UI.SetValue(...roundingSlider, 5);

const timeformat = new TimeFormat();
const easing = new Easings();

easing.CreateNew("watermark", { start_value: 10 });

const update_Date = () => {
    timeformat.SetDate();
};

const on_Draw = () => {
    const str = [];
    const settings = UI.GetValue(...combobox);

    const x = 750;
    const y = 200;

    const font = Render.AddFont("Verdana", 7, 400);

    const time = timeformat.GetCurrentTime();
    const weekday = timeformat.GetWeekday();

    const cheatName = UI.GetString(...cheatNameTextbox) || "onetap";
    const username = "Mased";
    const delay = Math.floor((Local.Latency() * 1000) / 1.5);
    const fps = 109;
    const timeFormatted = [time.hours, time.minutes, time.seconds].join(":");

    if (settings & (1 << 0)) str.push(cheatName);
    if (settings & (1 << 1)) str.push(username);
    if (settings & (1 << 2)) str.push("delay: " + delay + "ms");
    if (settings & (1 << 3)) str.push("fps: " + fps);
    if (settings & (1 << 4)) str.push(timeFormatted);
    if (settings & (1 << 5)) str.push(weekday);

    const textSize = Render.TextSizeCustom(str.join(" | "), font);
    const width = easing.UpdateValue("watermark", 5 + textSize[0] + 5);

    const style = UI.GetValue(...styleCombobox);

    (() => {
        if (style === 1) {
            UI.SetEnabled(...glow, true);
            UI.SetEnabled(...roundingSlider, true);
        } else {
            UI.SetEnabled(...glow, false);
            UI.SetEnabled(...roundingSlider, false);
        }

        switch (style) {
            case 0:
                return new SolusV1({ x: x, y: y, width: Math.floor(width), height: 5 + textSize[1] + 5 }).RenderBox({
                    gradient: true,
                    animated: true,
                    backgroundColor: [0, 0, 0, 140],
                });
            case 1:
                const box = new SolusV2({ x: x, y: y, width: Math.floor(width), height: 5 + textSize[1] + 5 }).RenderBox({
                    backgroundColor: [0, 0, 0, 140],
                    round_offset: UI.GetValue(...roundingSlider),
                });

                if (UI.GetValue(...glow)) box.RenderGlow({ round_offset: UI.GetValue(...roundingSlider) });

                return;
            case 2:
                return new GamesenseStyle({ x: x, y: y, width: Math.floor(width), height: 5 + textSize[1] + 5 })
                    .RenderBox()
                    .RenderGradient();
        }
    })();

    Render.StringCustom(x + 5, y + 5, 0, str.join(" | "), [0, 0, 0, 255], font);
    Render.StringCustom(x + 4, y + 5, 0, str.join(" | "), [255, 255, 255, 255], font);
};

Cheat.RegisterCallback("Draw", "update_Date");
Cheat.RegisterCallback("Draw", "on_Draw");
