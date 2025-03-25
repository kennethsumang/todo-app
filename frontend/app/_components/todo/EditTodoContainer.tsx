"use client";

import { Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import requestSpecificTodo from "@/app/_requests/todo/fetch-specific-todo.request";
import LoadingPage from "../misc/LoadingPage";
import TodoFormActions from "./TodoFormActions";
import { useTodoFormContext } from "@/app/_contexts/todo-form.context";
import { useRouter } from "next/navigation";
import requestUpdateTodo from "@/app/_requests/todo/edit-todo.request";
import TodoForm from "./TodoForm";
import { convertUtcToUserTimezone, toDayjs } from "@/app/_libs/date";
import ApiError from "@/app/_exceptions/api.error";

interface Props {
  todoId: string;
}

const EditTodoContainer: React.FC<Props> = ({ todoId }) => {
  const form = useTodoFormContext();
  const router = useRouter();
  const isInitialized = useRef<boolean>(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => requestSpecificTodo(todoId),
    enabled: !!todoId,
  });
  const { mutateAsync } = useMutation({
    mutationFn: () => requestUpdateTodo(todoId, form.getValues()),
    onSuccess: (data) => {
      router.push(`/todos/${data.todo.id}`);
    }
  });

  useEffect(() => {
    if (data && !isInitialized.current) {
      const newFormValues = {
        title: data.todo.title,
        details: data.todo.details,
        priority: data.todo.priority,
        status: data.todo.status,
        dueAt: toDayjs(convertUtcToUserTimezone(data.todo.dueAt)),
      };
      form.setInitialValues(newFormValues);
      form.setValues(newFormValues);
      isInitialized.current = true;
    }
  }, [data, form]);

  useEffect(() => {
    if (error && error instanceof ApiError && error.code === 401) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return <LoadingPage />
  }

  if (error || !data) {
    console.error(error);
    return <></>;
  }

  return (
    <form onSubmit={form.onSubmit(() => mutateAsync())}>
      <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
        <TodoForm
          isCreate={false}
          createdAt={toDayjs(convertUtcToUserTimezone(data.todo.createdAt))}
        />
      </Paper>
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions onCancel={() => router.push(`/todos/${todoId}`)} />
      </div>
    </form>
  );
}

export default EditTodoContainer;