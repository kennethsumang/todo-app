"use client";

import { CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <div className="h-full w-full flex flex-row justify-center">
      <CircularProgress variant="indeterminate" size={48} />
    </div>
  )
}