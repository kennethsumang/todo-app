import { TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

interface TodoRequestOptions extends RequestOptions {
  params: { todoId: string };
}

export interface TodoResponse {
  todo: TodoItem;
}

export class SpecificTodoRequest extends BaseRequest<TodoRequestOptions, TodoResponse> {
  url = "/api/todos/:todoId";
  method = "GET";
}

export default async function requestSpecificTodo(todoId: string) {
  return await new SpecificTodoRequest().request({
    params: { todoId },
  });
}
