"use client";

import useTodoStore, { initialFormValues } from "@/app/_store/todo.store";
import {Button, MenuItem, Paper, Typography} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {Menu, SubMenu} from "@szhsin/react-menu";
import TodoFilterChips from "./TodoFilterChips";
import { MouseEventHandler } from "react";

export default function TodoFilterContainer() {
  const router = useRouter();
  const { filters, setForm, setFilter } = useTodoStore();

  function handleNewTodoButtonClick() {
    setForm({ ...initialFormValues });
    router.push("/todos/new");
  }

  function handleFilterSelected(e, key: 'status'|'priority', value: number) {
    setFilter(key, value);
    e.keepOpen = false
  }

  return (
    <Paper square={false} className="flex flex-row justify-between p-2">
      <div className="flex flex-row gap-3">
        <Menu
          menuButton={() => (
            <Button
              variant="text"
              className="flex flex-row gap-2 !normal-case"
            >
              <Image src="/Filter.svg" height="24" width="24" alt="filter icon" />
              <Typography className="!text-sm">Filter</Typography>
            </Button>
          )}
        >
          <SubMenu label="Status">
            <MenuItem
              selected={filters.status === 0}
              onClick={(e) => handleFilterSelected(e, 'status', 0)}
            >
              Not Started
            </MenuItem>
            <MenuItem
              selected={filters.status === 1}
              onClick={(e) => handleFilterSelected(e, 'status', 1)}
            >
              In Progress
            </MenuItem>
            <MenuItem
              selected={filters.status === 2}
              onClick={(e) => handleFilterSelected(e, 'status', 2)}
            >
              Completed
            </MenuItem>
            <MenuItem
              selected={filters.status === 3}
              onClick={(e) => handleFilterSelected(e, 'status', 3)}
            >
              Cancelled
            </MenuItem>
          </SubMenu>
          <SubMenu label="Priority">
            <MenuItem
              selected={filters.priority === 0}
              onClick={(e) => handleFilterSelected(e, 'priority', 0)}
            >
              Low
            </MenuItem>
            <MenuItem
              selected={filters.priority === 1}
              onClick={(e) => handleFilterSelected(e, 'priority', 1)}
            >
              High
            </MenuItem>
            <MenuItem
              selected={filters.priority === 2}
              onClick={(e) => handleFilterSelected(e, 'priority', 2)}
            >
              Critical
            </MenuItem>
          </SubMenu>
        </Menu>
        <TodoFilterChips />
      </div>
      <Button
        variant="contained"
        className="dlex flex-row gap-2 !normal-case"
        onClick={handleNewTodoButtonClick}
      >
        <Image src="/Plus.svg" height="16" width="16" alt="plus icon" className="!text-white" />
        New Task
      </Button>
    </Paper>
  )
}
