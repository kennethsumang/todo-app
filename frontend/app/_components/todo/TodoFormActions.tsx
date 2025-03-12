"use client";

import { Button } from "@mui/material";

interface Props {
 todoId?: string;
}

const TodoFormActions: React.FC<Props> = () => {
  return (
    <>
      <Button variant="outlined" color="secondary">Cancel</Button>
      <Button variant="contained" color="primary">Save</Button>
    </>
  );
}

export default TodoFormActions;