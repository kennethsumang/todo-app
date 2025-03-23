import { Dayjs } from "dayjs";

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
  status?: number;
  priority?: number;
}

export interface TodoForm {
  priority?: number;
  status: number;
  title: string;
  dueAt: Dayjs;
  details: string;
}

export type TodoFormKeys = keyof TodoForm;
export type TodoFormValues = TodoForm[TodoFormKeys];
