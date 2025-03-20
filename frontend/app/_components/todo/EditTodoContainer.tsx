"use client";

import { Paper } from "@mui/material";
import React from "react";
import TodoForm from "./TodoFormContainer";
import { useQuery } from "@tanstack/react-query";
import requestSpecificTodo from "@/app/_requests/todo/fetch-specific-todo.request";
import LoadingPage from "../misc/LoadingPage";

interface Props {
  todoId: string;
}

const EditTodoContainer: React.FC<Props> = ({ todoId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => requestSpecificTodo(todoId),
  });

  if (isLoading) {
    return <LoadingPage />
  }

  if (error || !data) {
    console.error(error);
    return <></>;
  }

  return (
    <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
      <TodoForm initialData={data.todo} />
    </Paper>
  );
}

export default EditTodoContainer;