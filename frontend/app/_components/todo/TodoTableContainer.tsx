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
import React, { useState } from "react";
import {useQuery} from "@tanstack/react-query";
import requestTodoList, {TodoFilters} from "@/app/_requests/todo/fetch-todos.request";

interface Props {
  initialData: TodoItem[];
}

const TodoTableContainer: React.FC<Props> = ({ initialData }) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialData);
  const [filters, setFilters] = useState<TodoFilters>({});
  const fetchTodoMutation = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      return requestTodoList(filters);
    },
  })

  /**
   * Gets the priority chip element for display
   * @param {string} priority
   */
  function getPriorityChip(priority: string) {
    switch (priority) {
      case 'Critical':
        return <Chip color="error" label="Critical" />;
      case 'High':
        return <Chip color="warning" label="High" />;
      case 'Low':
        return <Chip color="success" label="Low" />;
      default:
        return <Chip color="error" label="Error" />;
    }
  }

  /**
   * Gets the status element
   * @param {string} status
   */
  function getStatusElement(status: string) {
    let circularProgress: React.ReactNode;
    switch (status) {
      case 'Completed':
        circularProgress = <CircularProgress variant="determinate" value={100} className="!w-[20px] !h-[20px]" />;
        break;
      case 'In Progress':
        circularProgress = <CircularProgress variant="determinate" value={25} className="!w-[20px] !h-[20px]" />;
        break;
      case 'Not Started':
        circularProgress = <CircularProgress variant="determinate" value={0} className="!w-[20px] !h-[20px]" />;
        break;
      default:
        circularProgress = <Chip color="error" label="Error" />;
    }

    return (
      <div className="flex flex-row gap-2">
        {circularProgress}
        <span className="text-sm">{status}</span>
      </div>
    )
  }

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
                <TableCell>{getPriorityChip(priorityValueToLabel[todo.priority.toString()] ?? "")}</TableCell>
                <TableCell>{getStatusElement(statusValueToLabel[todo.status.toString()] ?? "")}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => fetchTodoMutation.refetch()}>
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