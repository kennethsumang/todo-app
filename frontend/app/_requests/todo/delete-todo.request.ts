import { TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";
import _ from "lodash";

interface TodoRequestOptions extends RequestOptions {
  params: { todoId: string };
}

export interface TodoResponse {
  todo: TodoItem;
}

export class DeleteTodoRequest extends BaseRequest<
  TodoRequestOptions,
  TodoResponse
> {
  url = "/api/todos/:todoId";
  method = "DELETE";
}

export default async function requestDeleteTodo(todoId: string) {
  return await new DeleteTodoRequest().request({
    params: { todoId },
  });
}
