"use client";

import { Paper } from "@mui/material";
import React, { FormEvent } from "react";
import TodoFormActions from "./TodoFormActions";
import { useRouter } from "next/navigation";
import TodoForm from "./TodoForm";
import { convertUtcToUserTimezone, getUtcDate, toDayjs } from "@/app/_libs/date";
import useCreateTodoForm from "@/app/_hooks/use-create-todo-form.hook";

export default function CreateTodoContainer() {
  const router = useRouter();
  const { form, validate, setForm, errors, mutate } = useCreateTodoForm();

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validate(form as unknown as Record<string, unknown>);
    if (!result) {
      return;
    }

    await mutate();
  }

  return (
    <form className="h-[calc(-5rem+100%)]" onSubmit={(e) => onFormSubmit(e)}>
      <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
        <TodoForm
          isCreate={true}
          createdAt={toDayjs(convertUtcToUserTimezone(getUtcDate()))}
          form={form}
          errors={errors}
          setForm={setForm}
        />
      </Paper>
      <div className="flex flex-row justify-end gap-5">
        <TodoFormActions onCancel={() => router.push("/todos")} />
      </div>
    </form>
  );
}