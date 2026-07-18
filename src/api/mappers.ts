import type { Account, ActionHistory, PomodoroSession, Task } from "@/types";

type Row = Record<string, unknown>;

export function mapAccount(row: Row): Account {
  return {
    id: String(row.id), email: String(row.email), username: String(row.username),
    xp: Number(row.xp ?? 0), gold: Number(row.gold ?? 0), level: Number(row.level ?? 1),
    createdAt: String(row.created_at ?? ""), googleProviderId: row.google_provider_id as string | null ?? null,
    googleCalendarId: row.google_calendar_id as string | null ?? null,
    totalCompletedTasks: Number(row.total_completed_tasks ?? 0), totalFailedTasks: Number(row.total_failed_tasks ?? 0),
    totalPomodoroSessions: Number(row.total_pomodoro_sessions ?? 0), totalFocusMinutes: Number(row.total_focus_minutes ?? 0),
  };
}

export function mapTask(row: Row): Task {
  return {
    id: String(row.id), accountId: String(row.account_id), title: String(row.title),
    description: row.description as string | null ?? null, xpReward: Number(row.xp_reward ?? 0),
    xpPenalty: Number(row.xp_penalty ?? 0), dueDate: row.due_date as string | null ?? null,
    status: row.status as Task["status"], category: String(row.category),
    priority: (row.priority ?? "MEDIUM") as Task["priority"], completedAt: row.completed_at as string | null ?? null,
    googleEventId: row.google_event_id as string | null ?? null, dueDateChangedCount: Number(row.due_date_changed_count ?? 0),
    deadlineChangePenalty: Number(row.deadline_change_penalty ?? 0), createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
}

export function mapPomodoro(row: Row): PomodoroSession {
  return { id: String(row.id), taskId: String(row.task_id), startTime: String(row.start_time),
    endTime: row.end_time as string | undefined, duration: Number(row.duration ?? 0),
    xpReward: Number(row.xp_reward ?? 0), createdAt: String(row.created_at ?? "") };
}

export function mapHistory(row: Row): ActionHistory {
  return { id: String(row.id), action: String(row.action_type), description: row.description as string | null,
    createdAt: String(row.created_at), xpChange: Number(row.xp_gained ?? 0) };
}
