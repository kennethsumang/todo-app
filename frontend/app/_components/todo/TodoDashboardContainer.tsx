"use client";

import useTodoStore from "@/app/_store/todo.store";
import TodoFilterContainer from "./TodoFilterContainer";
import TodoTableContainer from "./TodoTableContainer";
import requestTodoList from "@/app/_requests/todo/fetch-todos.request";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../misc/LoadingPage";
import { useRouter } from "next/navigation";
import ApiError from "@/app/_exceptions/api.error";
import { useEffect } from "react";

export default function TodoDashboardContainer() {
  const router = useRouter();
  const { filters } = useTodoStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", filters],
    queryFn: () => requestTodoList(filters),
    throwOnError: false,
    retry: 1,
  });

  useEffect(() => {
    if (error && error instanceof ApiError && error.code === 401) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <TodoFilterContainer />
      <TodoTableContainer todos={data?.todos ?? []} />
    </>
  )
}