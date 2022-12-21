// @ts-nocheck

const Useful = require("./Modules/useful.ts");
const Timeouting = require("./Modules/timeout.ts");
const Animation = require("./Modules/animation.ts");

const information = [
    ["\n> MSDSync Welcomes you!", [255, 255, 255, 255]],
    ["Welcome, " + Cheat.GetUsername() + "!", [163, 191, 115, 255]],
];

information.forEach(function(stroke) {
    Cheat.PrintColor(stroke[1], stroke[0] + "\n");
});

module.exports = { Useful, Timeouting, Animation };
