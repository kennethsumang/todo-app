"use client";

import {useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import {Button, Divider, Paper} from "@mui/material";
import TodoPriorityChip from "@/app/_components/todo/TodoPriorityChip";
import TodoStatusProgress from "@/app/_components/todo/TodoStatusProgress";
import requestSpecificTodo from "@/app/_requests/todo/fetch-specific-todo.request";
import Image from "next/image";
import {TodoItem} from "@/app/_types/todo";
import {convertUtcToUserTimezone} from "@/app/_libs/date";

interface Props {
  todoId: string;
}

const ViewTodoContainer: React.FC<Props> = ({ todoId }) => {
  const router = useRouter();
  const data: { todo: TodoItem } = {
    todo: {
      id: '34cc1e47-4906-4974-ad72-61d49a3cf04b',
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

  const subtasks = [
    { title: "Prepare documentation", status: 2 },
    { title: "Prepare slides", status: 1 },
    { title: "Setup call", status: 0 },
  ]
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['todo', todoId],
  //   queryFn: () => requestSpecificTodo(todoId),
  //   retry: false,
  // });
  //
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // if (!todoId) {
  //   return router.replace("/app");
  // }

  // if (isLoading) {
  //   return <>Still loading...</>;
  // }
  //
  // if (error) {
  //   console.error(error);
  //   return <></>;
  // }

  return (
    <Paper square={false} className="flex flex-col gap-8 p-3 h-full">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-3">
          <TodoPriorityChip priority={data!.todo.priority} />
          <div className="flex flex-col content-center">
            <TodoStatusProgress status={data!.todo?.status} />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button variant="text">
            <Image src="/Trash.svg" alt="trash icon" width={16} height={16} />
          </Button>
          <Button variant="text" onClick={() => router.push(`/todos/${todoId}/edit`)}>
            <Image src="/Pencil.svg" alt="pencil icon" width={16} height={16} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">{data!.todo.title}</span>
        <span className="text-sm text-gray-500">
          {`${convertUtcToUserTimezone(data!.todo.createdAt, 'D MMM YYYY')} - ${convertUtcToUserTimezone(data!.todo.dueAt, 'D MMM YYYY')}`}
        </span>
        <span className="mt-3">
          {data!.todo.details}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <Divider />
        <span className="font-bold">Subtasks</span>
        {/* Placeholder subtasks */}
        <div className="flex flex-col gap-1">
          {subtasks.map((subtask) => {
            return (
              <div className="grid grid-cols-2" key={subtask.title}>
                <span>{subtask.title}</span>
                <TodoStatusProgress status={subtask.status} />
              </div>
            )
          })}
        </div>

      </div>
    </Paper>
  );
}

export default ViewTodoContainer;