export interface PomodoroSession {
    id: string;

    taskId: string;

    startTime: string;

    endTime?: string;

    duration: number;

    xpReward: number;

    createdAt: string;
}