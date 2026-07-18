export interface ActionHistory {
  id: string;
  action: string;
  description?: string | null;
  createdAt: string;
  xpChange?: number | null;
}