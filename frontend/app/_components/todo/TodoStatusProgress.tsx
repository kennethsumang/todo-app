"use client";

import {Chip, CircularProgress} from "@mui/material";
import React from "react";
import {statusValueToLabel} from "@/app/_constants/todo.constant";

interface Props {
  status: string|number;
}

const TodoStatusProgress: React.FC<Props> = ({ status }) => {
  let statusText = status;
  if (Number.isInteger(status) || !Number.isNaN(Number(status))) {
    statusText = statusValueToLabel[status.toString()];
  }

  let circularProgress: React.ReactNode;
  switch (statusText) {
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
      <span className="text-sm">{statusText}</span>
    </div>
  )
}

export default TodoStatusProgress;