import { createFormContext } from "@mantine/form";
import { TodoForm } from "../_types/todo";

// You can give context variables any name
export const [TodoFormProvider, useTodoFormContext, useTodoForm] =
  createFormContext<TodoForm>();
