function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getMiniCalendarDates(
  month: Date,
  weekStartsOn: 0 | 1,
): Date[] {
  const firstDay = new Date(
    month.getFullYear(),
    month.getMonth(),
    1,
  );

  const leadingDays =
    (firstDay.getDay() - weekStartsOn + 7) % 7;

  const startDate = new Date(firstDay);

  startDate.setDate(
    firstDay.getDate() - leadingDays,
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);

    date.setDate(startDate.getDate() + index);
    date.setHours(0, 0, 0, 0);

    return date;
  });
}

function addMonths(date: Date, amount: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() + amount,
    1,
  );
}

export {
  addMonths,
  getMiniCalendarDates,
  isSameDay,
};