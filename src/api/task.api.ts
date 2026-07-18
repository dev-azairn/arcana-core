import api from "./axios";
import type { CreateTaskRequest, Task, UpdateTaskRequest } from "@/types";
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
    task: CreateTaskRequest
): Promise<Task> => {
    const { data } = await api.post("/api/task", toTaskPayload(task));
    return mapTask(data);
};

export const updateTask = async (
    id: string,
    task: UpdateTaskRequest
): Promise<Task> => {
    const { data } = await api.put(
        `/api/task/${id}`,
        toTaskPayload(task)
    );

    return mapTask(data);
};

function toTaskPayload(task: CreateTaskRequest | UpdateTaskRequest) {
  return {
    title: task.title,
    description: task.description,
    status: "status" in task ? task.status : undefined,
    due_date: task.dueDate,
    category: task.category,
    priority: task.priority,
  };
}

export const deleteTask = async (
    id: string
): Promise<void> => {
    await api.delete(`/api/task/${id}`);
};

