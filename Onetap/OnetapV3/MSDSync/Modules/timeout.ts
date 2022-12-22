interface Interval {
    old_time: number;
    func: Function;
    timeout: number;
}

const intervals = {};

const CreateTimeout = function(name: string, cb: (timeout?: Interval) => void, time: number): Interval {
    if(intervals[name]) throw new Error("Timeout already exists!");

    const Curtime = Globals.Curtime();

    const interval = intervals[name] = { old_time: Curtime + time, func: cb, timeout: time };

    return interval;
};

const CheckTimeouts = function() {
    const keys = Object.keys(intervals);
    const Curtime = Globals.Curtime();

    keys.forEach(function(key) {
        const timeout: Interval = intervals[key];

        if(timeout.old_time < Curtime) {
            timeout.func(timeout);

            intervals[key].old_time = Curtime + timeout.timeout;
        };
    });
};

export { Interval, intervals, CreateTimeout, CheckTimeouts };
