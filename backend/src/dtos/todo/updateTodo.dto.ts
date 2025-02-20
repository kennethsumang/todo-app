import { $Enums } from "@prisma/client";

export interface UpdateTodoDto {
  details?: string;
  dueAt?: Date|string;
  status?: $Enums.TodoStatus;
}