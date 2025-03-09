"use client";

import { convertUtcToUserTimezone, getUtcDate } from "@/app/_libs/date";
import { TodoItem } from "@/app/_types/todo";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@mui/material";
import Image from "next/image";
import React from "react";
import useTodoStore from "@/app/_store/todo.store";
import TodoPriorityChip from "@/app/_components/todo/TodoPriorityChip";
import TodoStatusProgress from "@/app/_components/todo/TodoStatusProgress";

export default function TodoTableContainer() {
  // const { todos, filters } = useTodoStore();
  const todos: TodoItem[] = [
    {
      id: 'a03d3c40-4485-4a82-8473-de42dfa2c401',
      userId: 'test',
      title: 'Prepare for developer meeting discussion',
      details: 'Prepare notes and things to remember for the meeting.',
      status: 2,
      priority: 0,
      createdAt: getUtcDate().toString(),
      dueAt: getUtcDate().toString(),
      completedAt: null,
      updatedAt: null,
    },
    {
      id: '34cc1e47-4906-4974-ad72-61d49a3cf04b',
      userId: 'test',
      title: 'Prepare Materials for Sprint Review',
      details: 'Prepare documentation and slides for the finished stories.',
      status: 1,
      priority: 2,
      createdAt: getUtcDate().toString(),
      dueAt: getUtcDate().toString(),
      completedAt: null,
      updatedAt: null,
    },
    {
      id: '34a9a2a3-2eba-4348-8e76-f501a95262c1',
      userId: 'test',
      title: 'Conduct onboarding for new hires',
      details: 'Prepare and conduct onboarding meetings about application functionalities.',
      status: 0,
      priority: 1,
      createdAt: getUtcDate().toString(),
      dueAt: getUtcDate().toString(),
      completedAt: null,
      updatedAt: null,
    }
  ]

  return (
    <Paper square={false} className="flex flex-row justify-between p-2">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Image src="/Trash.svg" height="16" width="16" alt="trash icon" />
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={false}
                direction="asc"
                onClick={() => {}}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={false}
                direction="asc"
                onClick={() => {}}
              >
                Due Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={false}
                direction="asc"
                onClick={() => {}}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={false}
                direction="asc"
                onClick={() => {}}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {todos.map((todo) => {
            return (
              <TableRow
                hover
                key={todo.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={false}
                  />
                </TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{convertUtcToUserTimezone(todo.dueAt)}</TableCell>
                <TableCell>
                  <TodoPriorityChip priority={todo.priority} />
                </TableCell>
                <TableCell>
                  <TodoStatusProgress status={todo.status} />
                </TableCell>
                <TableCell>
                  <Button variant="text">
                    <Image src="/Pencil.svg" height="12" width="12" alt="pencil icon" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}
