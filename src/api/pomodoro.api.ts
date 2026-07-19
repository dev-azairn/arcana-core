import api from "./axios";
import type { PomodoroSession } from "@/types";
import { mapPomodoro } from "./mappers";

export const getSessions = async (): Promise<
    PomodoroSession[]
> => {
    const { data } = await api.get("/api/pomodoro");
    return data.map(mapPomodoro);
};

export const startPomodoro = async (
    taskId: string
): Promise<PomodoroSession> => {
    const { data } = await api.post(
        "/api/pomodoro",
        {
            task_id: taskId,
        }
    );

    return mapPomodoro(data);
};

export const finishPomodoro = async (
    id: string,
    duration: number,
): Promise<PomodoroSession> => {
    const { data } = await api.put(`/api/pomodoro/${id}`, { duration });

    return mapPomodoro(data);
};

export const getHistory = async (): Promise<
    PomodoroSession[]
> => {
    return getSessions();
};
