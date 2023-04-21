const Checkbox = require("../MSDSync/Modules/OnetapElements/Checkbox.js").Checkbox;
const testCheckbox = new Checkbox("Hello world").Create();

Cheat.Print("\n---------- Checkbox Tests ---------- \n\n");

const toPrint = [
    "Name: " + testCheckbox.GetName(),
    "Value: " + testCheckbox.GetValue(),
    "Path: " + '["' + testCheckbox.Path().join('", "') + '"]',
];

testCheckbox.AddCallback(function (checkbox) {
    Cheat.Print("Checkbox value is: " + checkbox.GetValue() + "\n");
});

const on_Draw = function () {
    testCheckbox.CheckCallback();
};

Cheat.RegisterCallback("Draw", "on_Draw");

Cheat.Print(toPrint.join("\n"));
Cheat.Print("\n\n---------- Checkbox Tests End ---------- \n\n");
