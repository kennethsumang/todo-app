"use client";

import { Paper } from "@mui/material";
import React, { FormEvent, useEffect, useRef } from "react";
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
import useUpdateTodoForm from "@/app/_hooks/use-update-todo-form.hook";

interface Props {
  todoId: string;
}

const EditTodoContainer: React.FC<Props> = ({ todoId }) => {
  const router = useRouter();
  const isInitialized = useRef<boolean>(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => requestSpecificTodo(todoId),
    enabled: !!todoId,
  });
  const { form, setForm, errors, setInitialValues, validate, mutate } = useUpdateTodoForm(todoId);
  const { mutateAsync } = useMutation({
    mutationFn: () => requestUpdateTodo(todoId, form),
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
      setInitialValues(newFormValues);
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = validate(form as unknown as Record<string, any>);
    if (!result) {
      return;
    }

    await mutate();
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
        <TodoForm
          isCreate={false}
          createdAt={toDayjs(convertUtcToUserTimezone(data.todo.createdAt))}
          form={form}
          setForm={setForm}
          errors={errors}
        />
      </Paper>
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions onCancel={() => router.push(`/todos/${todoId}`)} />
      </div>
    </form>
  );
}

export default EditTodoContainer;