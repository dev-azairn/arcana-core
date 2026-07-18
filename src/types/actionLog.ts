export type ActionType =
    | "REGISTER"
    | "LOGIN"
    | "TASK_CREATED"
    | "TASK_UPDATED"
    | "TASK_COMPLETED"
    | "TASK_FAILED"
    | "TASK_DELETED"
    | "POMODORO_STARTED"
    | "POMODORO_COMPLETED"
    | "DEADLINE_CHANGED"
    | "LEVEL_UP";

export interface ActionLog {
    id: string;

    accountId: string;

    actionType: ActionType;

    description: string;

    xpGained: number;

    goldGained: number;

    createdAt: string;
}

