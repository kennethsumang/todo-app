"use client";

import { priorityValueToLabel, statusValueToLabel } from "@/app/_constants/todo.constant";
import useTodoStore from "@/app/_store/todo.store";
import { Chip } from "@mui/material";

export default function TodoFilterChips() {
  const { filters, setFilter } = useTodoStore();

  return (
    <div className="flex flex-row gap-3">
      {filters.status !== undefined && (
        <Chip
          label={statusValueToLabel[filters.status.toString()]}
          onDelete={() => setFilter("status", undefined)}
        />
      )}
      {filters.priority !== undefined && (
        <Chip
          label={priorityValueToLabel[filters.priority.toString()]}
          onDelete={() => setFilter("priority", undefined)}
        />
      )}
    </div>
  )
}