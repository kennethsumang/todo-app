"use client";

import {useMutation, useQuery} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Divider, IconButton, Paper} from "@mui/material";
import TodoPriorityChip from "@/app/_components/todo/TodoPriorityChip";
import TodoStatusProgress from "@/app/_components/todo/TodoStatusProgress";
import requestSpecificTodo from "@/app/_requests/todo/fetch-specific-todo.request";
import Image from "next/image";
import {convertUtcToUserTimezone} from "@/app/_libs/date";
import LoadingPage from "../misc/LoadingPage";
import ApiError from "@/app/_exceptions/api.error";
import ConfirmTodoDeleteDialog from "./ConfirmTodoDeleteDialog";
import requestDeleteTodo from "@/app/_requests/todo/delete-todo.request";
import { toast } from "react-toastify";

interface Props {
  todoId: string;
}

const ViewTodoContainer: React.FC<Props> = ({ todoId }) => {
  const router = useRouter();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => requestSpecificTodo(todoId),
  });
  const { mutateAsync } = useMutation({
    mutationFn: () => requestDeleteTodo(todoId),
    onSuccess: () => {
      router.push("/todos");
      toast("Todo successfully deleted.");
    }
  });

  // const subtasks = [
  //   { title: "Prepare documentation", status: 2 },
  //   { title: "Prepare slides", status: 1 },
  //   { title: "Setup call", status: 0 },
  // ];

  useEffect(() => {
    if (!todoId) {
      router.replace("/todos");
    }
  }, [router, todoId]);

  useEffect(() => {
    if (error && error instanceof ApiError && error.code === 401) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const convertedTzCreatedAt = convertUtcToUserTimezone(data!.todo.createdAt, 'D MMM YYYY');
  const convertedTzDueAt = convertUtcToUserTimezone(data!.todo.dueAt, 'D MMM YYYY')
  return (
    <Paper square={false} className="flex flex-col gap-8 p-5 h-full">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-3">
          <TodoPriorityChip priority={data!.todo.priority} />
          <div className="flex flex-col justify-center">
            <TodoStatusProgress status={data!.todo?.status} />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <IconButton onClick={() => setConfirmDialogOpen(true)}>
            <Image src="/Trash.svg" alt="trash icon" width={24} height={24} />
          </IconButton>
          <IconButton onClick={() => router.push(`/todos/${todoId}/edit`)}>
            <Image src="/Pencil.svg" alt="pencil icon" width={24} height={24} />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold todo-title">{data!.todo.title}</span>
        <span className="text-sm text-gray-500">
          {`${convertedTzCreatedAt} - ${convertedTzDueAt}`}
        </span>
        <span className="mt-3">
          {data!.todo.details}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <Divider />
        <span className="font-bold">Subtasks</span>
        {/* Placeholder subtasks */}
        {/* <div className="flex flex-col gap-1">
          {subtasks.map((subtask) => {
            return (
              <div className="grid grid-cols-2" key={subtask.title}>
                <span>{subtask.title}</span>
                <TodoStatusProgress status={subtask.status} />
              </div>
            )
          })}
        </div> */}

      </div>
      <ConfirmTodoDeleteDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={() => mutateAsync()}
        todoTitle={data!.todo.title}
      />
    </Paper>
  );
}

export default ViewTodoContainer;