function startOfDay(date: Date): Date {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getMonthGridDates(
  month: Date,
  weekStartsOn: 0 | 1 = 1,
): Date[] {
  const firstDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    1,
  );

  const firstDayIndex = firstDayOfMonth.getDay();

  const leadingDayCount =
    (firstDayIndex - weekStartsOn + 7) % 7;

  const gridStart = new Date(firstDayOfMonth);

  gridStart.setDate(
    firstDayOfMonth.getDate() - leadingDayCount,
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);

    date.setDate(gridStart.getDate() + index);

    return startOfDay(date);
  });
}

export {
  getMonthGridDates,
  isSameDay,
};