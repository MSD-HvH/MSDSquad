interface Interval {
    old_time: number;
    func: Function;
    timeout: number;
}

const intervals = {};

const CreateTimeout = function(name: string, cb: () => void, time: number) {
    if(intervals[name]) throw new Error("Timeout already exists!");

    const Curtime = Globals.Curtime();

    intervals[name] = { old_time: Curtime + time, func: cb, timeout: time };
};

const CheckTimeouts = function() {
    const keys = Object.keys(intervals);
    const Curtime = Globals.Curtime();

    keys.forEach(function(key) {
        const timeout: Interval = intervals[key];

        if(timeout.old_time < Curtime) {
            timeout.func();

            intervals[key].old_time = Curtime + timeout.timeout;
        };
    });
};

export { Interval, intervals, CreateTimeout, CheckTimeouts };
