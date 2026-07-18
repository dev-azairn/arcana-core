function isSameCalendarDate(
  left: Date,
  right: Date,
): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatWeekday(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  }).format(date);
}

function formatDayNumber(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
  }).format(date);
}

function formatAccessibleDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export {
  formatAccessibleDate,
  formatDayNumber,
  formatWeekday,
  isSameCalendarDate,
};