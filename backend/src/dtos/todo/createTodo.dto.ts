export interface CreateTodoDto {
  title: string;
  details: string;
  dueAt: Date|string;
  priority: number;
  status: number;
}