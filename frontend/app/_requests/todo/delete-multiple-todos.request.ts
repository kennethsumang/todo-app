import { TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

interface TodoRequestOptions extends RequestOptions {
  query: { ids: string };
}

export interface TodoResponse {
  todo: TodoItem;
}

export class DeleteMultipleTodoRequest extends BaseRequest<
  TodoRequestOptions,
  TodoResponse
> {
  url = "/api/todos";
  method = "DELETE";
}

export default async function requestDeleteMultipleTodos(ids: string) {
  return await new DeleteMultipleTodoRequest().request({
    query: { ids },
  });
}
