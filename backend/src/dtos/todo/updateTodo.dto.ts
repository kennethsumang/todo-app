export interface UpdateTodoDto {
  details?: string;
  dueAt?: Date|string;
  status?: number;
}