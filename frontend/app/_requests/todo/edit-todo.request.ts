import { TodoForm, TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

interface TodoRequestOptions extends RequestOptions {
  body: TodoForm;
  params: { todoId: string };
}

export interface TodoResponse {
  todo: TodoItem;
}

export class UpdateTodoRequest extends BaseRequest<
  TodoRequestOptions,
  TodoResponse
> {
  url = "/api/todos/:todoId";
  method = "PUT";
}

export default async function requestUpdateTodo(
  todoId: string,
  form: TodoForm
) {
  return await new UpdateTodoRequest().request({
    body: form,
    params: { todoId },
  });
}
