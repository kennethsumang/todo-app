"use client";

import { Button } from "@mui/material";

interface Props {
  onCancel: () => void;
}

const TodoFormActions: React.FC<Props> = ({ onCancel }) => {
  return (
    <div className="flex flex-row gap-3 mt-3">
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </div>
  );
}

export default TodoFormActions;