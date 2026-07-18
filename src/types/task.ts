export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "DONE"
  | "FAILED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  accountId: string;
  title: string;
  description: string | null;
  xpReward: number;
  xpPenalty: number;
  dueDate: string | null;
  status: TaskStatus;
  category: string;
  priority: TaskPriority;
  completedAt: string | null;
  googleEventId: string | null;
  dueDateChangedCount: number;
  deadlineChangePenalty: number;
  createdAt: string;
  updatedAt: string;
}


export interface CreateTaskRequest {
  title: string;
  category: string;
  priority: TaskPriority;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string | null;
  category?: string;
  priority?: TaskPriority;
}
