"use client";

import { Paper } from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import requestSpecificTodo from "@/app/_requests/todo/fetch-specific-todo.request";
import LoadingPage from "../misc/LoadingPage";
import TodoFormActions from "./TodoFormActions";
import { useTodoFormContext } from "@/app/_contexts/todo-form.context";
import { useRouter } from "next/navigation";
import requestUpdateTodo from "@/app/_requests/todo/edit-todo.request";
import TodoForm from "./TodoForm";
import { convertUtcToUserTimezone, toDayjs } from "@/app/_libs/date";

interface Props {
  todoId: string;
}

const EditTodoContainer: React.FC<Props> = ({ todoId }) => {
  const form = useTodoFormContext();
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => requestSpecificTodo(todoId),
  });
  const { mutateAsync } = useMutation({
    mutationFn: () => requestUpdateTodo(todoId, form.getValues()),
    onSuccess: (data) => {
      router.push(`/todos/${data.todo.id}`);
    }
  });

  if (isLoading) {
    return <LoadingPage />
  }

  if (error || !data) {
    console.error(error);
    return <></>;
  }

  const newFormValues = {
    title: data.todo.title,
    details: data.todo.details,
    priority: data.todo.priority,
    status: data.todo.status,
    dueAt: toDayjs(convertUtcToUserTimezone(data.todo.dueAt)),
  };
  const createdAt = toDayjs(convertUtcToUserTimezone(data.todo.createdAt));
  form.setInitialValues(newFormValues);
  form.setValues(newFormValues);

  return (
    <form onSubmit={form.onSubmit(() => mutateAsync())}>
      <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
        <TodoForm isCreate={false} createdAt={createdAt} />
      </Paper>
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions onCancel={() => router.push(`/todos/${todoId}`)} />
      </div>
    </form>
  );
}

export default EditTodoContainer;