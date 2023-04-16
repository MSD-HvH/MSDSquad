type CallbackFunction = (...a: any) => void;

export interface Interval {
    old_time: number;
    callbackFn: CallbackFunction;
    timeout: number;
}

export interface Timeout {
    old_time: number;
    callbackFn: CallbackFunction;
}

export interface TimeoutSystemStructure {
    intervals: { [id: string]: Interval };
    timeouts: { [id: string]: Timeout };
}

export class TimeoutSystem implements TimeoutSystemStructure {
    public readonly intervals: { [id: string]: Interval } = {};
    public readonly timeouts: { [id: string]: Timeout } = {};

    constructor() {}

    /**
     * Создаёт интервал который срабатывает по времени.
     *
     * @param {string} name Название интервала
     * @param {(interval?: Interval) => void} callbackFn Вызываемая функция
     * @param {number} time Время через которое функция будет вызываться (в секундах).
     */
    public readonly CreateInterval = (name: string, callbackFn: (interval?: Interval) => void, time: number): Interval => {
        if (this.intervals[name]) throw new Error("Interval already exists!");

        const Curtime = Globals.Curtime();
        const interval = (this.intervals[name] = { old_time: Curtime + time, callbackFn, timeout: time });

        return interval;
    };

    /**
     * Создаёт таймаут который срабатывает по времени.
     *
     * @param {string} name Название таймаута
     * @param {(timeout?: Timeout) => void} callbackFn Вызываемая функция
     * @param {number} time Время через которое функция будет вызвана (в секундах).
     */
    public readonly CreateTimeout = (name: string, callbackFn: (timeout?: Timeout) => void, time: number): Timeout => {
        if (this.timeouts[name]) throw new Error("Timeout already exists!");

        const Curtime = Globals.Curtime();
        const timeout = (this.timeouts[name] = { old_time: Curtime + time, callbackFn });

        return timeout;
    };

    /**
     * @example
     * ```
     * // Раз в 5 секунд выводит в консоль Hello world
     * const IntervalHelloWorld = CreateInterval("HelloWorld", function() {
     *     Cheat.Print("Hello world Timeout \n");
     * }, 5);
     *
     * // Один раз выведет в консоль Hello world
     * const TimeoutHelloWorld = CreateTimeout("HelloWorld", function() {
     *      Cheat.Print("Hello world Interval \n");
     * }, 3);
     *
     * const onDraw = function() {
     *     CheckTimeouts();
     * };
     *
     * Cheat.RegisterCallback("Draw", "onDraw");
     * ```
     */
    public readonly CheckTimeouts = () => {
        const interval_keys = Object.keys(this.intervals);
        const timeout_keys = Object.keys(this.timeouts);
        const Curtime = Globals.Curtime();

        interval_keys.forEach((key) => {
            const interval: Interval = this.intervals[key];

            if (interval.old_time < Curtime) {
                interval.callbackFn(interval);

                this.intervals[key].old_time = Curtime + interval.timeout;
            }
        });

        timeout_keys.forEach((key) => {
            const timeout: Timeout = this.timeouts[key];

            if (timeout.old_time < Curtime) {
                timeout.callbackFn(timeout);

                delete this.timeouts[key];
            }
        });
    };
}
