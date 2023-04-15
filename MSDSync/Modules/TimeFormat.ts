export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type Month =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export const weekdays: Weekday[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const months: Month[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export interface CurrentDate {
    /**
     * Текущий день
     *
     * @type {number}
     */
    day: number;

    /**
     * Текущее число месяц
     *
     * @type {number}
     */
    month_number: number;

    /**
     * Текущий месяц
     *
     * @type {Month}
     */
    month: Month;

    /**
     * Текущий год
     *
     * @type {number}
     */
    year: number;

    /**
     * Текущий день недели
     *
     * @type {Weekday}
     */
    weekday: Weekday;
}

export interface CurrentTime {
    /**
     * Текущий час
     *
     * @type {string};
     */
    hours: string;

    /**
     * Текущие минуты
     *
     * @type {string}
     */
    minutes: string;

    /**
     * Текущие секунды
     *
     * @type {string}
     */
    seconds: string;
}

interface TimeFormatStructure {
    /**
     * Текущая дата
     *
     * @type {Date}
     */
    date: Date;
}

export class TimeFormat<D extends Date> implements TimeFormatStructure {
    public readonly date: Date;

    constructor(date: D = new Date() as D) {
        this.date = date;
    }

    /**
     * Получить текущий день
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const day = timeFormat.GetDay();
     *
     * Cheat.Print(day + "\n");
     * ```
     * ---
     *
     * @returns {number} Текущий день
     */
    public readonly GetDay = (): number => {
        return this.date.getDate();
    };

    /**
     * Получить текущее число месяц
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const monthNumber = timeFormat.GetMonthNumber();
     *
     * Cheat.Print(monthNumber + "\n");
     * ```
     * ---
     *
     * @returns {number} Текущее число месяца
     */
    public readonly GetMonthNumber = (): number => {
        return this.date.getMonth();
    };

    /**
     * Получить текущий месяц
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const month = timeFormat.GetMonth();
     *
     * Cheat.Print(month + "\n");
     * ```
     * ---
     *
     * @returns {Month} Текущий месяц
     */
    public readonly GetMonth = (): Month => {
        return months[this.GetMonthNumber()];
    };

    /**
     * Получить текущий год
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const year = timeFormat.GetYear();
     *
     * Cheat.Print(year + "\n");
     * ```
     * ---
     *
     * @returns {number} Текущий год
     */
    public readonly GetYear = (): number => {
        return this.date.getFullYear();
    };

    /**
     * Получить текущий день недели
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const weekday = timeFormat.GetWeekday();
     *
     * Cheat.Print(weekday + "\n");
     * ```
     * ---
     *
     * @returns {Weekday} Текущий день недели
     */
    public readonly GetWeekday = (): Weekday => {
        return weekdays[this.date.getDay()];
    };

    /**
     * Получить текущий час
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const hour = timeFormat.GetHours();
     *
     * Cheat.Print(hour + "\n");
     * ```
     * ---
     *
     * @returns {string} Текущий час
     */
    public readonly GetHours = (): string => {
        return this.date.toTimeString().substring(0, 2);
    };

    /**
     * Получить текущие минуты
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const minutes = timeFormat.GetMinutes();
     *
     * Cheat.Print(minutes + "\n");
     * ```
     * ---
     *
     * @returns {string} Текущие минуты
     */
    public readonly GetMinutes = (): string => {
        return this.date.toTimeString().substring(3, 5);
    };

    /**
     * Получить текущие секунды
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const seconds = timeFormat.GetSeconds();
     *
     * Cheat.Print(seconds + "\n");
     * ```
     * ---
     *
     * @returns {string} Текущие секунды
     */
    public readonly GetSeconds = (): string => {
        return this.date.toTimeString().substring(6, 8);
    };

    /**
     * Получить текущую дату:
     * День, месяц, год, день недели
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const date = timeFormat.GetCurrentDate();
     *
     * Cheat.Print([date.day, date.month, date.year, date.weekday].join(" ") + "\n");
     * ```
     * ---
     *
     * @returns {CurrentDate} Текущая дата
     */
    public readonly GetCurrentDate = (): CurrentDate => {
        const day: number = this.GetDay();
        const month_number: number = this.GetMonthNumber();
        const month: Month = this.GetMonth();
        const year: number = this.GetYear();

        const weekday: Weekday = this.GetWeekday();

        return { day, month_number, month, year, weekday };
    };

    /**
     * Получить текущее время:
     * Часы, минуты, секунды
     *
     * ---
     * @example
     * ```ts
     * const timeFormat = new TimeFormat();
     * const time = timeFormat.GetCurrentTime();
     *
     * Cheat.Print([time.hours, time.minutes, time.seconds].join(":") + "\n");
     * ```
     * ---
     *
     * @returns {CurrentDate} Текущее время
     */
    public readonly GetCurrentTime = (): CurrentTime => {
        const hours: string = this.GetHours();
        const minutes: string = this.GetMinutes();
        const seconds: string = this.GetSeconds();

        return { hours, minutes, seconds };
    };
}
