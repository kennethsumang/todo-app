"use client";

import useTodoStore from "@/app/_store/todo.store";
import TodoFilterContainer from "./TodoFilterContainer";
import TodoTableContainer from "./TodoTableContainer";
import requestTodoList, { mockRequestTodoList } from "@/app/_requests/todo/fetch-todos.request";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../misc/LoadingPage";

export default function TodoDashboardContainer() {
  const { filters } = useTodoStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", filters],
    queryFn: () => requestTodoList(filters),
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  
  if (error) {
    console.error(error);
    return <></>;
  }

  return (
    <>
      <TodoFilterContainer />
      <TodoTableContainer todos={data?.todos ?? []} />
    </>
  )
}