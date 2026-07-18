import api from "./axios";
import type { Task } from "@/types";
import { mapTask } from "./mappers";

export const getTasks = async (): Promise<Task[]> => {
    const { data } = await api.get("/api/task");
    return data.map(mapTask);
};

export const getTask = async (
    id: string
): Promise<Task> => {
    const { data } = await api.get(`/api/task/${id}`);
    return mapTask(data);
};

export const createTask = async (
    task: Partial<Task>
): Promise<Task> => {
    const { data } = await api.post("/api/task", toTaskPayload(task));
    return mapTask(data);
};

export const updateTask = async (
    id: string,
    task: Partial<Task>
): Promise<Task> => {
    const { data } = await api.put(
        `/api/task/${id}`,
        toTaskPayload(task)
    );

    return mapTask(data);
};

function toTaskPayload(task: Partial<Task>) {
  return { title: task.title, description: task.description, status: task.status,
    due_date: task.dueDate, xp_reward: task.xpReward, category: task.category, priority: task.priority };
}

export const deleteTask = async (
    id: string
): Promise<void> => {
    await api.delete(`/api/task/${id}`);
};

