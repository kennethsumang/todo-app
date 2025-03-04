"use client";

import { priorityValueToLabel, statusValueToLabel } from "@/app/_constants/todo.constant";
import { convertUtcToUserTimezone } from "@/app/_libs/date";
import { TodoItem } from "@/app/_types/todo";
import { Checkbox, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface Props {
  initialData: TodoItem[]; 
}

const TodoTableContainer: React.FC<Props> = ({ initialData }) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialData);

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
                <TableCell>{priorityValueToLabel[todo.priority.toString()] ?? ""}</TableCell>
                <TableCell>{statusValueToLabel[todo.status.toString()] ?? ""}</TableCell>
                <TableCell>
                  <Image src="/Pencil.svg" height="12" width="12" alt="pencil icon" />
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