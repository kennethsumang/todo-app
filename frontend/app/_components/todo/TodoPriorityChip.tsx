"use client";

import React from "react";
import {Chip} from "@mui/material";
import {priorityValueToLabel} from "@/app/_constants/todo.constant";

interface Props {
  priority: string|number;
}

const TodoPriorityChip: React.FC<Props> = ({ priority }) => {
  let priorityText = priority;
  if (Number.isInteger(priority) || !Number.isNaN(Number(priority))) {
    priorityText = priorityValueToLabel[priority.toString()];
  }

  switch (priorityText) {
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

export default TodoPriorityChip;