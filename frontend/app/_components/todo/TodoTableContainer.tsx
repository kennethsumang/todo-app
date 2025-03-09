"use client";

import { priorityValueToLabel, statusValueToLabel } from "@/app/_constants/todo.constant";
import { convertUtcToUserTimezone } from "@/app/_libs/date";
import { TodoItem } from "@/app/_types/todo";
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
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
  const { todos, filters } = useTodoStore();

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
