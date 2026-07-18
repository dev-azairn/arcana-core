export const queryKeys = {
    auth: ["auth"],

    dashboard: ["dashboard"],

    tasks: ["tasks"],

    task: (id: string) => ["task", id],

    pomodoro: ["pomodoro"],

    profile: ["profile"],

    history: ["history"],
} as const;

