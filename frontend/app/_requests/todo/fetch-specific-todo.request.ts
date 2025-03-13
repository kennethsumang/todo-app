import { TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

interface TodoRequestOptions extends RequestOptions {
  params: { todoId: string };
}

export interface TodoResponse {
  todo: TodoItem;
}

export class SpecificTodoRequest extends BaseRequest<
  TodoRequestOptions,
  TodoResponse
> {
  url = "/api/todos/:todoId";
  method = "GET";

  async mockRequest(
    options: TodoRequestOptions,
    delay: number = 0
  ): Promise<TodoResponse> {
    const data = {
      todo: {
        id: "34cc1e47-4906-4974-ad72-61d49a3cf04b",
        userId: "test",
        title: "Prepare Materials for Sprint Review",
        details: "Prepare documentation and slides for the finished stories.",
        status: 1,
        priority: 2,
        createdAt: "2025-03-04T14:40:33.286Z",
        dueAt: "2026-02-19T12:43:16.994Z",
        completedAt: null,
        updatedAt: null,
      },
    };
    if (delay === 0) {
      return data;
    }

    await this.timeout(delay);
    return data;
  }
}

export default async function requestSpecificTodo(todoId: string) {
  return await new SpecificTodoRequest().request({
    params: { todoId },
  });
}

export async function mockRequestSpecificTodo(
  todoId: string,
  delay: number = 0
) {
  return await new SpecificTodoRequest().mockRequest(
    { params: { todoId } },
    delay
  );
}
