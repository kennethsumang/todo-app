"use client";

import React from "react";
import {Breadcrumbs, Button, Typography} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import _ from "lodash";

interface Props {
  todoId: string|null;
}

const AppBreadcrumb: React.FC<Props> = ({ todoId }) => {
  const router = useRouter();
  const path = usePathname();
  const splittedPath = path.split('/');
  const lastPath = _.last(splittedPath);

  if (lastPath === 'new') {
    return <span className="font-bold">New Task</span>
  }

  if (!todoId) {
    return <span className="font-bold">To-do</span>;
  }

  if (lastPath === 'edit') {
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
          <Breadcrumbs aria-label="Breadcrumb">
            <Typography className="!text-gray-500">View Task</Typography>
            <Typography sx={{ color: 'text.primary' }}>Edit</Typography>
          </Breadcrumbs>
        </div>
      </div>
    );
  }

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
          <Breadcrumbs aria-label="Breadcrumb">
            <Typography sx={{ color: 'text.primary' }}>View Task</Typography>
          </Breadcrumbs>
        </div>
      </div>
    );
  }

  
}

export default AppBreadcrumb;