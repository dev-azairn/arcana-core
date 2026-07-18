import {
    format,
    formatDistanceToNow,
    isToday,
    isTomorrow,
    isYesterday,
    isPast,
} from "date-fns";

export function formatDate(date: Date | string) {
    return format(new Date(date), "dd MMM yyyy");
}

export function formatDateTime(date: Date | string) {
    return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function relativeDate(date: Date | string) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}

export function checkToday(date: Date | string) {
    return isToday(new Date(date));
}

export function checkTomorrow(date: Date | string) {
    return isTomorrow(new Date(date));
}

export function checkYesterday(date: Date | string) {
    return isYesterday(new Date(date));
}

export function isOverdue(date: Date | string) {
    return isPast(new Date(date));
}