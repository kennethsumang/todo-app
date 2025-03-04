"use client";

import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";

export default function TodoFilterContainer() {
  return (
    <Paper square={false} className="flex flex-row justify-between p-2">
      <Button variant="text" className="flex flex-row gap-2 !normal-case">
        <Image src="/Filter.svg" height="16" width="16" alt="filter icon" />
        <Typography className="!text-sm">Filter</Typography>
      </Button>
      <Button variant="contained" className="dlex flex-row gap-2 !normal-case">
        <Image src="/Plus.svg" height="16" width="16" alt="plus icon" className="!text-white" />
        New Task
      </Button>
    </Paper>
  )
}