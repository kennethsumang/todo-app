import { TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

export interface TodoFilters {
  userId?: string;
  page?: number;
  limit?: number;
}

interface TodoRequestOptions extends RequestOptions {
  query: TodoFilters;
}

export interface TodoResponse {
  data: TodoItem[];
}

export class TodoRequest extends BaseRequest<
  TodoRequestOptions,
  TodoResponse
> {
  url = "/api/todos";
  method = "GET";
}

export default async function requestTodoList(
  filters: TodoFilters,
) {
  return await new TodoRequest().request({
    query: filters,
  });
}
