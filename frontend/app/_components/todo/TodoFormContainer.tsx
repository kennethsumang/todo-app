"use client";

import { TodoItem } from "@/app/_types/todo";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useTodoStore from "@/app/_store/todo.store";

interface Props {
  initialData?: TodoItem;
}

const TodoFormContainer: React.FC<Props> = ({ initialData }) => {
  const { form, setForm, setFormValue } = useTodoStore();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData, setForm]);

  return (
    <div className="pl-24 pr-24 pt-8">
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <FormControl className="w-[9rem]">
              <InputLabel id="priority-form-label">Priority</InputLabel>
              <Select
                labelId="priority-form-label"
                id="priority-form-select"
                value={form.priority}
                label="Priority"
                onChange={(e) => setFormValue("priority", Number(e.target.value))}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>High</MenuItem>
                <MenuItem value={2}>Critical</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-[9rem]">
              <InputLabel id="status-form-label">Status</InputLabel>
              <Select
                labelId="status-form-label"
                id="status-form-select"
                value={form.status}
                label="Status"
                onChange={(e) => setFormValue("status", Number(e.target.value))}
              >
                <MenuItem value={0}>Not Started</MenuItem>
                <MenuItem value={1}>In Progress</MenuItem>
                <MenuItem value={2}>Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl fullWidth>
            <TextField
              id="title-form-input"
              label="Title"
              placeholder="Add a meaningful title for your task."
              multiline
              rows={4}
              value={form.title}
              onChange={(e) => setFormValue("title", e.target.value )}
            />
          </FormControl>
          <div className="flex flex-row gap-3">
            <FormControl fullWidth>
              <DatePicker
                label="Date Created"
                onChange={() => {}}
              />
            </FormControl>
            <FormControl fullWidth>
              <DatePicker
                label="Due Date"
                onChange={() => {}}
              />
            </FormControl>
          </div>
          <FormControl fullWidth>
            <TextField
              id="details-form-input"
              label="Details"
              placeholder="Add meaningful details."
              multiline
              rows={4}
              value={form.details}
              onChange={(e) => setFormValue("details", e.target.value )}
            />
          </FormControl>
        </div>
      </form>
    </div>
  );
}

export default TodoFormContainer;