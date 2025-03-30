import { TodoFilters, TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

interface TodoRequestOptions extends RequestOptions {
  query: TodoFilters;
}

export interface TodoResponse {
  todos: TodoItem[];
  count: number;
}

export class TodoRequest extends BaseRequest<TodoRequestOptions, TodoResponse> {
  url = "/api/todos";
  method = "GET";
}

export default async function requestTodoList(filters: TodoFilters) {
  return await new TodoRequest().request({
    query: filters,
  });
}
