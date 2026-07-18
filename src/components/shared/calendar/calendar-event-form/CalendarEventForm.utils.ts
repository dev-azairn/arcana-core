import type {
  CalendarEventFormValues,
} from "./CalendarEventForm.types";

const calendarEventDefaultValues: CalendarEventFormValues = {
  title: "",
  description: "",
  start: "",
  end: "",
  allDay: false,
};

function getCalendarEventFormValues(
  initialValues?: Partial<CalendarEventFormValues>,
): CalendarEventFormValues {
  return {
    ...calendarEventDefaultValues,
    ...initialValues,
  };
}

function isCalendarEventRangeValid(
  start: string,
  end: string,
  allDay: boolean,
): boolean {
  if (!start || !end) {
    return true;
  }

  if (allDay) {
    return end >= start;
  }

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (
    Number.isNaN(startTime) ||
    Number.isNaN(endTime)
  ) {
    return false;
  }

  return endTime > startTime;
}

export {
  calendarEventDefaultValues,
  getCalendarEventFormValues,
  isCalendarEventRangeValid,
};