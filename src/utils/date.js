export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export function createYear(year, data) {
  const months = [];
  for (let month = 0; month < 12; month++) {
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    const numDays = getDaysInMonth(month, year);
    const days = [];
    for (let day = 1; day <= numDays; day++) {
      const dayName = new Date(year, month, day).toLocaleString("default", {
        weekday: "long",
      });

      const dateKey = formatDate(year, month + 1, day);

      if (data[dateKey]) {
        days.push({ name: dayName, value: data[dateKey] });
      } else {
        days.push({ name: dayName, value: 0 });
      }
    }
    months.push({ name: monthName, days });
  }
  return months;
}
