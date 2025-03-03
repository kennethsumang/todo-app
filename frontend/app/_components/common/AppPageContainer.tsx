"use client";

import { Paper } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const AppPageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="ml-[240px] p-3 h-full w-[calc(100% - 240px)]">
      <Paper square={false} className="!bg-[#f2f8fd] w-full h-full p-3">
        {children}
      </Paper>
    </div>
  )
}

export default AppPageContainer;