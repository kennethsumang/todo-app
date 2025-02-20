import { $Enums } from "@prisma/client";

export interface CreateTodoDto {
  title: string;
  details: string;
  dueAt: Date|string;
  priority: $Enums.TodoPriority;
  status: $Enums.TodoStatus;
}