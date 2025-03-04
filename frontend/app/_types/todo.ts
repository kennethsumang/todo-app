export interface TodoItem {
  id: string;
  userId: string;
  title: string;
  details: string;
  priority: number;
  status: number;
  createdAt: Date | string;
  dueAt: Date | string;
  completedAt: Date | string | null;
  updatedAt: Date | string | null;
}
