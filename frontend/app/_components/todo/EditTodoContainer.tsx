"use client";

import { Paper } from "@mui/material";
import React from "react";
import TodoForm from "./TodoFormContainer";
import { TodoItem } from "@/app/_types/todo";

interface Props {
  todoId: string;
}

const EditTodoContainer: React.FC<Props> = ({ todoId }) => {
  const data: { todo: TodoItem } = {
    todo: {
      id: todoId,
      userId: 'test',
      title: 'Prepare Materials for Sprint Review',
      details: 'Prepare documentation and slides for the finished stories.',
      status: 1,
      priority: 2,
      createdAt: "2025-03-04T14:40:33.286Z",
      dueAt: "2026-02-19T12:43:16.994Z",
      completedAt: null,
      updatedAt: null,
    }
  };
  return (
    <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
      <TodoForm initialData={data.todo} />
    </Paper>
  );
}

export default EditTodoContainer;