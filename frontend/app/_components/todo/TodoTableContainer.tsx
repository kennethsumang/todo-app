"use client";

import { convertUtcToUserTimezone } from "@/app/_libs/date";
import { TodoItem } from "@/app/_types/todo";
import {
  Button,
  Checkbox,
  Link,
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
import TodoPriorityChip from "@/app/_components/todo/TodoPriorityChip";
import TodoStatusProgress from "@/app/_components/todo/TodoStatusProgress";
import { useRouter } from "next/navigation";

interface Props {
  todos: TodoItem[];
}

const TodoTableContainer: React.FC<Props> = ({ todos }) => {
  const router = useRouter();

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
                <TableCell>
                  <Link href={`/todos/${todo.id}`} className="!text-black !underline !decoration-black">
                    {todo.title}
                  </Link>
                </TableCell>
                <TableCell>{convertUtcToUserTimezone(todo.dueAt)}</TableCell>
                <TableCell>
                  <TodoPriorityChip priority={todo.priority} />
                </TableCell>
                <TableCell>
                  <TodoStatusProgress status={todo.status} />
                </TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => router.push(`/todos/${todo.id}/edit`)}>
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

export default TodoTableContainer;