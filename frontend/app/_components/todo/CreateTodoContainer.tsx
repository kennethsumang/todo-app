"use client";

import { Paper } from "@mui/material";
import React from "react";
import TodoFormActions from "./TodoFormActions";
import { useRouter } from "next/navigation";
import requestCreateTodo from "@/app/_requests/todo/create-todo.request";
import { useMutation } from "@tanstack/react-query";
import TodoForm from "./TodoForm";
import { useTodoFormContext } from "@/app/_contexts/todo-form.context";

export default function CreateTodoContainer() {
  const router = useRouter();
  const form = useTodoFormContext();
  const { mutateAsync: mutateCreateTodo } = useMutation({
    mutationFn: () => requestCreateTodo(form.getValues()),
    onSuccess: (data) => {
      router.push(`/todos/${data.todo.id}`);
    }
  });

  return (
    <form className="h-[calc(-5rem+100%)]" onSubmit={form.onSubmit(() => mutateCreateTodo())}>
      <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
        <TodoForm isCreate={true} />
      </Paper>
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions onCancel={() => router.push("/todos")} />
      </div>
    </form>
  );
}