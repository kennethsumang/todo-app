import { TodoForm, TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";
import { convertUserTimezoneToUtc } from "@/app/_libs/date";

interface TodoRequestOptions extends RequestOptions {
  body: TodoForm;
}

export interface TodoResponse {
  todo: TodoItem;
}

export class CreateTodoRequest extends BaseRequest<
  TodoRequestOptions,
  TodoResponse
> {
  url = "/api/todos";
  method = "POST";
}

export default async function requestCreateTodo(form: TodoForm) {
  return await new CreateTodoRequest().request({
    body: { ...form, dueAt: convertUserTimezoneToUtc(form.dueAt) },
  });
}
