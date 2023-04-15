const TimeFormat = require("../MSDSync/index.js").TimeFormat;
const timeFormat = new TimeFormat(new Date());

const day = timeFormat.GetDay();
const month_number = timeFormat.GetMonthNumber();
const month = timeFormat.GetMonth();
const year = timeFormat.GetYear();

const weekday = timeFormat.GetWeekday();

const hours = timeFormat.GetHours();
const minutes = timeFormat.GetMinutes();
const seconds = timeFormat.GetSeconds();
const timezone = timeFormat.GetTimezoneOffset();

const currentDate = timeFormat.GetCurrentDate();
const currentTime = timeFormat.GetCurrentTime();

Cheat.Print("\n---------- Time Tests ---------- \n\n");

const toPrint = [
    "Current day: " + day,
    "Current month_number: " + (month_number + 1),
    "Current month: " + month,
    "Current year: " + year,
    "Current weekday: " + weekday + "\n",
    "Current hours: " + hours,
    "Current minutes: " + minutes,
    "Current seconds: " + seconds,
    "Current timezone: " + timezone + "\n",
    "Current date: " + [currentDate.day, currentDate.month, currentDate.year, currentDate.weekday].join(" "),
    "Current time: " + [currentTime.hours, currentTime.minutes, currentTime.seconds].join(":"),
];

Cheat.Print(toPrint.join("\n"));

Cheat.Print("\n\n---------- Time Tests End ---------- \n");
