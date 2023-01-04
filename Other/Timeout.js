/* eslint-disable @typescript-eslint/no-explicit-any */
const intervals = {};
const timeouts = {};

/**
 * Создаёт интервал который срабатывает по времени.
 *
 * @param name Название интервала
 * @param callback Вызываемая функция
 * @param time Время через которое функция будет вызываться (в секундах).
 */
const CreateInterval = function (name, callback, time) {
    if (intervals[name]) throw new Error("Interval already exists!");

    const Curtime = Globals.Curtime();
    const interval = intervals[name] = { old_time: Curtime + time, func: callback, timeout: time };

    return interval;
};

/**
 * Создаёт таймаут который срабатывает по времени.
 *
 * @param name Название таймаута
 * @param callback Вызываемая функция
 * @param time Время через которое функция будет вызвана (в секундах).
 */
const CreateTimeout = function (name, callback, time) {
    if (timeouts[name]) throw new Error("Timeout already exists!");

    const Curtime = Globals.Curtime();
    const timeout = timeouts[name] = { old_time: Curtime + time, func: callback };

    return timeout;
};

/**
 * @example

 * ```
 * // Раз в 5 секунд выводит в консоль Hello world
 * const IntervalHelloWorld = CreateInterval("HelloWorld", function() {
 *     Cheat.Print("Hello world Interval \n");
 * }, 5);
 *
 * // Один раз выведет в консоль Hello world
 * const TimeoutHelloWorld = CreateTimeout("HelloWorld", function() {
 *      Cheat.Print("Hello world Timeout \n");
 * }, 5);
 *
 * const onDraw = function() {
 *     CheckTimeouts();
 * };
 *
 * Cheat.RegisterCallback("Draw", "onDraw");
 * ```
 */
const CheckTimeouts = function () {
    const interval_keys = Object.keys(intervals);
    const timeout_keys = Object.keys(timeouts);
    const Curtime = Globals.Curtime();

    interval_keys.forEach(function (key) {
        const interval = intervals[key];

        if (interval.old_time < Curtime) {
            interval.func(interval);

            intervals[key].old_time = Curtime + interval.timeout;
        };
    });

    timeout_keys.forEach(function (key) {
        const timeout = timeouts[key];

        if (timeout.old_time < Curtime) {
            timeout.func(timeout);

            delete timeouts[key];
        };
    });
};