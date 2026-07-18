/**
 * XP required for next level
 *
 * Level 1 -> 100
 * Level 2 -> 200
 * Level 3 -> 300
 */

export function calculateNextLevelXP(level: number) {
    return level * 100;
}

export function calculateProgress(
    currentXP: number,
    maxXP: number
) {
    return Math.min(
        (currentXP / maxXP) * 100,
        100
    );
}

export function addXP(
    currentXP: number,
    amount: number
) {
    return currentXP + amount;
}

export function removeXP(
    currentXP: number,
    amount: number
) {
    return Math.max(currentXP - amount, 0);
}

export function hasLevelUp(
    xp: number,
    level: number
) {
    return xp >= calculateNextLevelXP(level);
}