export interface Account {
  id: string;
  email: string;
  username: string;
  xp: number;
  gold: number;
  level: number;
  createdAt: string;
  googleProviderId: string | null;
  googleCalendarId: string | null;
  totalCompletedTasks: number;
  totalFailedTasks: number;
  totalPomodoroSessions: number;
  totalFocusMinutes: number;
}

export function getNextLevelXp(level: number): number {
  return Math.max(100, level * 100);
}
