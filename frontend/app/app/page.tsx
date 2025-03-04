"use server";

import TodoFilterContainer from "../_components/todo/TodoFilterContainer";
import TodoTableContainer from "../_components/todo/TodoTableContainer";
import { getSessionFromServer } from "../_libs/session";
import requestTodoList from "../_requests/todo/fetch-todos.request";
import { TodoItem } from "../_types/todo";

export default async function DashboardPage() {
  let todos: TodoItem[] = [];
  try {
    const session = await getSessionFromServer();
    const response = await requestTodoList({
      userId: session.user!.id,
      page: 1,
      limit: 10,
    }, session.accessToken ?? "");
    console.log(response);

    if (response.data) {
      todos = response.data;
    }
  } catch (e) {
    console.error(e);
    todos = [];
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold">To-do</span>
      <TodoFilterContainer />
      <TodoTableContainer initialData={todos} />
    </div>
  );
}