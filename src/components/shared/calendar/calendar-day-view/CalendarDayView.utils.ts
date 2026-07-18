function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getMinutesFromStartOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function createDateAtMinutes(
  date: Date,
  minutes: number,
): Date {
  const result = new Date(date);

  result.setHours(
    Math.floor(minutes / 60),
    minutes % 60,
    0,
    0,
  );

  return result;
}

function formatHour(hour: number): string {
  const date = new Date();

  date.setHours(hour, 0, 0, 0);

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatEventTime(
  start: Date,
  end: Date,
): string {
  const formatter = new Intl.DateTimeFormat(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit",
    },
  );

  return `${formatter.format(start)} – ${formatter.format(end)}`;
}

export {
  createDateAtMinutes,
  formatEventTime,
  formatHour,
  getMinutesFromStartOfDay,
  isSameDay,
};