"use client";

import { Paper } from "@mui/material";
import React from "react";
import TodoForm from "./TodoFormContainer";

export default function CreateTodoContainer() {
  return (
    <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
      <TodoForm />
    </Paper>
  );
}