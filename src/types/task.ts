export type TaskStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed"
  | "cancelled";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  accountId: string;
  title: string;
  description: string | null;
  xpReward: number;
  xpPenalty: number;
  dueDate: string | null;
  status: TaskStatus;
  category: string | null;
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
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string | null;
}