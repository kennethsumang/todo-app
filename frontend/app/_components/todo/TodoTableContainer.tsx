"use client";

import { convertUtcToUserTimezone } from "@/app/_libs/date";
import { TodoItem } from "@/app/_types/todo";
import {
  Button,
  Checkbox,
  IconButton,
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
import React, { useState } from "react";
import TodoPriorityChip from "@/app/_components/todo/TodoPriorityChip";
import TodoStatusProgress from "@/app/_components/todo/TodoStatusProgress";
import { useRouter } from "next/navigation";
import _ from "lodash";

interface Props {
  todos: TodoItem[];
}

const TodoTableContainer: React.FC<Props> = ({ todos }) => {
  const router = useRouter();
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);

  /**
   * Handles item checkbox click
   * @param {string} id 
   */
  function handleItemCheckboxClick(id: string) {
    if (selectedTodos.includes(id)) {
      const selectedItems = selectedTodos.filter((item) => id !== item);
      console.log(selectedItems);
      setSelectedTodos(selectedItems);
      return;
    }

    const selectedItems = [...selectedTodos, id];
    setSelectedTodos(selectedItems);
  }

  return (
    <Paper square={false} className="flex flex-row justify-between p-2">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <IconButton>
                <Image src="/Trash.svg" height="24" width="24" alt="trash icon" />
              </IconButton>
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
                    checked={selectedTodos.includes(todo.id)}
                    onClick={() => handleItemCheckboxClick(todo.id)}
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
                  <IconButton onClick={() => router.push(`/todos/${todo.id}/edit`)}>
                    <Image src="/Pencil.svg" height="24" width="24" alt="pencil icon" />
                  </IconButton>
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