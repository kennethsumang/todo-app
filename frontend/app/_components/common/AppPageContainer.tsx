"use client";

import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AppPageContainer: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null; // Prevents mismatches during SSR
  
  return (
    <div className="ml-[240px] p-3 h-full w-[calc(100% - 240px)]">
      <Paper square={false} className="!bg-[#f2f8fd] w-full h-full p-3">
        {children}
      </Paper>
    </div>
  )
}

export default AppPageContainer;