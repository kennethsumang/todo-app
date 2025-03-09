"use client";

import useTodoStore from "@/app/_store/todo.store";
import TodoFilterContainer from "./TodoFilterContainer";
import TodoTableContainer from "./TodoTableContainer";
import { useEffect } from "react";

export default function TodoDashboardContainer() {
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <TodoFilterContainer />
      <TodoTableContainer  />
    </>
  )
}