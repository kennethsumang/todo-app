"use client";

import useTodoStore, { initialFormValues } from "@/app/_store/todo.store";
import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TodoFilterContainer() {
  const router = useRouter();
  const { setForm } = useTodoStore();

  function handleNewTodoButtonClick() {
    setForm({ ...initialFormValues });
    router.push("/todos/new");
  }

  return (
    <Paper square={false} className="flex flex-row justify-between p-2">
      <Button variant="text" className="flex flex-row gap-2 !normal-case">
        <Image src="/Filter.svg" height="24" width="24" alt="filter icon" />
        <Typography className="!text-sm">Filter</Typography>
      </Button>
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