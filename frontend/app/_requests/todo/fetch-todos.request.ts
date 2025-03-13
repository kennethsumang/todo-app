import { TodoFilters, TodoItem } from "@/app/_types/todo";
import BaseRequest, { RequestOptions } from "../base.request";

interface TodoRequestOptions extends RequestOptions {
  query: TodoFilters;
}

export interface TodoResponse {
  todos: TodoItem[];
}

export class TodoRequest extends BaseRequest<TodoRequestOptions, TodoResponse> {
  url = "/api/todos";
  method = "GET";

  async mockRequest(
    options: TodoRequestOptions,
    delay: number = 0
  ): Promise<TodoResponse> {
    const data = {
      todos: [
        {
          id: "a03d3c40-4485-4a82-8473-de42dfa2c401",
          userId: "test",
          title: "Prepare for developer meeting discussion",
          details: "Prepare notes and things to remember for the meeting.",
          status: 2,
          priority: 0,
          createdAt: "2025-03-04T14:40:33.286Z",
          dueAt: "2026-02-20T12:43:16.994Z",
          completedAt: null,
          updatedAt: null,
        },
        {
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
        {
          id: "34a9a2a3-2eba-4348-8e76-f501a95262c1",
          userId: "test",
          title: "Conduct onboarding for new hires",
          details:
            "Prepare and conduct onboarding meetings about application functionalities.",
          status: 0,
          priority: 1,
          createdAt: "2025-03-04T14:40:33.286Z",
          dueAt: "2026-02-18T12:43:16.994Z",
          completedAt: null,
          updatedAt: null,
        },
      ],
    };

    if (delay === 0) {
      return data;
    }

    await this.timeout(delay);
    return data;
  }
}

export default async function requestTodoList(filters: TodoFilters) {
  return await new TodoRequest().request({
    query: filters,
  });
}

export async function mockRequestTodoList(
  filters: TodoFilters,
  delay: number = 0
) {
  return await new TodoRequest().mockRequest(
    {
      query: filters,
    },
    delay
  );
}
