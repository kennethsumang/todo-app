"use client";

import { TodoForm, TodoItem } from "@/app/_types/todo";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useTodoStore from "@/app/_store/todo.store";
import { convertUtcToUserTimezone, toDayjs } from "@/app/_libs/date";

interface Props {
  initialData?: TodoItem;
}

const TodoFormContainer: React.FC<Props> = ({ initialData }) => {
  const isCreateTodo = !initialData;
  const { form, setForm, setFormValue } = useTodoStore();

  useEffect(() => {
    if (initialData) {
      const initialForm: TodoForm = {
        title: initialData.title,
        details: initialData.details,
        priority: initialData.priority,
        status: initialData.status,
        dueAt: toDayjs(convertUtcToUserTimezone(initialData.dueAt))
      };
      setForm(initialForm);
    }
  }, [initialData, setForm]);

  return (
    <div className="pl-24 pr-24 pt-8">
      <form>
        <div className="grid grid-cols-4 gap-3">
          <FormControl className="col-span-1" disabled={!isCreateTodo}>
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
          <FormControl className="col-span-1">
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
          <FormControl fullWidth className="col-start-1 col-span-4">
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
          {!isCreateTodo && (
            <FormControl fullWidth className="col-start-1 col-span-2" disabled>
              <DatePicker
                label="Date Created"
                value={toDayjs(convertUtcToUserTimezone(initialData.createdAt))}
                onChange={() => {}}
                disabled
              />
            </FormControl>
          )}
          <FormControl fullWidth className="col-span-2">
            <DatePicker
              label="Due Date"
              value={form.dueAt}
              onChange={() => {}}
            />
          </FormControl>
          <FormControl fullWidth className="col-span-4">
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