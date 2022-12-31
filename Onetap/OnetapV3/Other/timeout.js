exports.intervals = {};
exports.timeouts = {};

/**
 * Создаёт интервал который срабатывает по времени.
 *
 * @param name Название интервала
 * @param callback Вызываемая функция
 * @param time Время через которое функция будет вызываться (в секундах).
 */
exports.CreateInterval = function(name, cb, time) {
    if(exports.intervals[name]) throw new Error("Interval already exists!");

    const Curtime = Globals.Curtime();

    const interval = exports.intervals[name] = { old_time: Curtime + time, func: cb, timeout: time };

    return interval;
};

/**
 * Создаёт таймаут который срабатывает по времени.
 *
 * @param name Название таймаута
 * @param callback Вызываемая функция
 * @param time Время через которое функция будет вызвана (в секундах).
 */
exports.CreateTimeout = function(name, cb, time) {
    if(exports.timeouts[name]) throw new Error("Timeout already exists!");

    const Curtime = Globals.Curtime();

    const interval = exports.timeouts[name] = { old_time: Curtime + time, func: cb };

    return interval;
};

/**
 * @example


 *
 * ```
 * // Раз в 5 секунд выводит в консоль Hello world
 * const IntervalHelloWorld = CreateInterval("HelloWorld", function() {
 *     Cheat.Print("Hello world \n");
 * }, 5);
 * 
 * // Один раз выведет в консоль Hello world
 * const TimeoutHelloWorld = CreateTimeout("HelloWorld", function() {
 *      Cheat.Print("Hello world\n");
 * }, 5);
 *
 * const onDraw = function() {
 *     CheckIntervals();
 * };
 *
 * Cheat.RegisterCallback("Draw", "onDraw");
 * ```
 */
exports.CheckTimeouts = function() {
    const interval_keys = Object.keys(exports.intervals);
    const timeout_keys = Object.keys(exports.timeouts);
    const Curtime = Globals.Curtime();

    interval_keys.forEach(function(key) {
        const interval = exports.intervals[key];

        if(interval.old_time < Curtime) {
            interval.func(interval);

            exports.intervals[key].old_time = Curtime + interval.timeout;
        }
    });

    timeout_keys.forEach(function(key) {
        const timeout = exports.timeouts[key];

        if(timeout.old_time < Curtime) {
            timeout.func(timeout);

            delete exports.timeouts[key];
        }
    });
};