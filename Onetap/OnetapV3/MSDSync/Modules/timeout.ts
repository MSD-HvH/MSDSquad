const intervals = {};

const CreateTimeout = function(name, cb, time) {
    if(intervals[name]) throw new Error("Timeout already exists!");

    const Curtime = Globals.Curtime();

    intervals[name] = { old_time: Curtime + time, func: cb, timeout: time };
};

const CheckTimeouts = function() {
    const keys = Object.keys(intervals);
    const Curtime = Globals.Curtime();

    keys.forEach(function(key) {
        const timeout = intervals[key];

        if(timeout.old_time < Curtime) {
            timeout.func();

            intervals[key].old_time = Curtime + timeout.timeout;
        };
    });
};

module.exports = { intervals, CreateTimeout, CheckTimeouts };
