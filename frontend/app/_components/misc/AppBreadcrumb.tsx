"use client";

import React from "react";
import {Button} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  todoId: string|null;
}

const AppBreadcrumb: React.FC<Props> = ({ todoId }) => {
  const router = useRouter();

  if (todoId) {
    return (
      <div className="flex flex-row gap-2">
        <Button
          variant="text"
          className="flex flex-row gap-2 text-blue-500 w-[5rem]"
          onClick={() => router.push("/todos")}
        >
          <Image src="/Back.svg" width={16} height={16} alt="Back icon" />
          <span className="font-bold !normal-case">Back</span>
        </Button>
        <div className="pl-3 border-l-2 border-gray-200 pt-[0.5rem]">
          <span className="text-black text-sm font-bold">View Task</span>
        </div>
      </div>
    );
  }

  return <span className="font-bold">To-do</span>;
}

export default AppBreadcrumb;