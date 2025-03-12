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

export interface TodoFilters {
  userId?: string;
  id?: string;
  page?: number;
  limit?: number;
}

export interface TodoForm {
  priority: number;
  status: number;
  title: string;
  dueAt: Date | string;
  details: string;
}

export type TodoFormKeys = keyof TodoForm;
export type TodoFormValues = TodoForm[TodoFormKeys];
