"use client";

import { convertUtcToUserTimezone } from "@/app/_libs/date";
import { TodoItem } from "@/app/_types/todo";
import {
  Button,
  Checkbox,
  IconButton,
  Link,
  Pagination,
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
import useTodoStore from "@/app/_store/todo.store";
import ConfirmMultipleTodoDeleteDialog from "./ConfirmMultipleTodoDeleteDialog";
import { useMutation } from "@tanstack/react-query";
import requestDeleteMultipleTodos from "@/app/_requests/todo/delete-multiple-todos.request";
import { toast } from "react-toastify";
import TodoDashboardDueDate from "./TodoDashboardDueDate";

interface Props {
  todos: TodoItem[];
  count: number;
}

const TodoTableContainer: React.FC<Props> = ({ todos, count }) => {
  const router = useRouter();
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const { filters, setFilter } = useTodoStore();
  const { mutateAsync } = useMutation({
    mutationFn: () => requestDeleteMultipleTodos(selectedTodos.join(",")),
    onSuccess: () => {
      toast(`${selectedTodos.length} todos have been successfully deleted.`, { type: "success" });
    },
    onError: () => {
      toast("Failed to delete selected todos. Please try again.", { type: "error" });
    },
  });

  /**
   * Handles item checkbox click
   * @param {string} id 
   */
  function handleItemCheckboxClick(id: string) {
    if (selectedTodos.includes(id)) {
      const selectedItems = selectedTodos.filter((item) => id !== item);
      setSelectedTodos(selectedItems);
      return;
    }

    const selectedItems = [...selectedTodos, id];
    setSelectedTodos(selectedItems);
  }

  return (
    <Paper square={false} className="flex flex-col justify-between p-2 h-full">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <IconButton onClick={() => setConfirmDialogOpen(true)}>
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
                    className="todo-delete-checkbox"
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/todos/${todo.id}`}
                    className="!text-black !underline !decoration-black todo-title"
                    data-id={todo.id}
                  >
                    {todo.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <TodoDashboardDueDate
                    date={todo.dueAt}
                    priority={todo.priority}
                    status={todo.status}
                    title={todo.title}
                  />
                </TableCell>
                <TableCell>
                  <TodoPriorityChip priority={todo.priority} />
                </TableCell>
                <TableCell>
                  <TodoStatusProgress status={todo.status} />
                </TableCell>
                <TableCell>
                  <IconButton aria-label={`${todo.id}-edit-button`} onClick={() => router.push(`/todos/${todo.id}/edit`)}>
                    <Image src="/Pencil.svg" height="24" width="24" alt="pencil icon" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-center mt-3 mb-3">
        <Pagination
          count={Math.ceil(count / (filters.limit ?? 10))}
          color="primary"
          page={filters.page}
          onChange={(e, value) => setFilter("page", value)}
        />
      </div>
      <ConfirmMultipleTodoDeleteDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={() => mutateAsync()}
        todoCount={selectedTodos.length}
      />
    </Paper>
  )
}

export default TodoTableContainer;