export function formatXP(xp: number) {
    return `${xp} XP`;
}

export function formatLevel(level: number) {
    return `Lv. ${level}`;
}

export function formatMinutes(minutes: number) {
    return `${minutes} min`;
}

export function formatHours(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if (h === 0) return `${m} min`;

    return `${h}h ${m}m`;
}

export function formatPercentage(value: number) {
    return `${value.toFixed(0)}%`;
}