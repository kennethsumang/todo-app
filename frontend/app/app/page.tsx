"use server";

import TodoFilterContainer from "../_components/todo/TodoFilterContainer";
import TodoTableContainer from "../_components/todo/TodoTableContainer";
import { getSessionFromServer } from "../_libs/session";
import requestTodoList from "../_requests/todo/fetch-todos.request";
import { TodoItem } from "../_types/todo";
import ApiError from "@/app/_exceptions/api.error";
import { redirect } from "next/navigation";
import requestLogout from "@/app/_requests/auth/logout.request";

export default async function DashboardPage() {
  const session = await getSessionFromServer();

  /**
   * Fetches todos
   */
  async function fetchTodos() {
    try {
      const response = await requestTodoList({
        userId: session.user!.id,
        page: 1,
        limit: 10,
      });

      if (response.data) {
        return response.data;
      }

      return [];
    } catch (e) {
      console.error((e as ApiError).code, (e as ApiError).message);
      if (e instanceof ApiError && e.code === 401) {
        return await logoutUser();
      }
      return [];
    }
  }

  async function logoutUser() {
    await requestLogout();
    return redirect("/");
  }

  const todos: TodoItem[] = await fetchTodos();

  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold">To-do</span>
      <TodoFilterContainer />
      <TodoTableContainer initialData={todos} />
    </div>
  );
}