const TimeoutSystem = require("../MSDSync/Modules/Timeout.js").TimeoutSystem;
const timeoutSystem = new TimeoutSystem();

timeoutSystem.CreateTimeout(
    "printWorld",
    function (timeout) {
        Cheat.Print("hello world timeout \n");
    },
    3
);
timeoutSystem.CreateInterval(
    "printWorldInterval",
    function (interval) {
        Cheat.Print("hello world interval \n");
    },
    3
);

const on_draw = function () {
    timeoutSystem.CheckTimeouts();
};

Cheat.RegisterCallback("Draw", "on_draw");
