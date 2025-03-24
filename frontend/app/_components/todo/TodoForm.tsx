"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTodoFormContext } from "@/app/_contexts/todo-form.context";
import { Dayjs } from "dayjs";
import { convertUtcToUserTimezone, getUtcDate, toDayjs } from "@/app/_libs/date";

interface Props {
  isCreate: boolean;
  createdAt?: Dayjs;
}

const TodoForm: React.FC<Props> = ({ isCreate, createdAt }) => {
  const form = useTodoFormContext();

  return (
    <div className="pl-24 pr-24 pt-8">
      <div className="grid grid-cols-4 gap-3">
        <FormControl className="col-span-1" disabled={!isCreate}>
          <InputLabel id="priority-form-label">Priority</InputLabel>
          <Select
            labelId="priority-form-label"
            id="priority-form-select"
            label="Priority"
            defaultValue="0"
            {...form.getInputProps("priority")}
          >
            <MenuItem value={0}>Low</MenuItem>
            <MenuItem value={1}>High</MenuItem>
            <MenuItem value={2}>Critical</MenuItem>
          </Select>
          {form.errors?.priority && <small className="text-red-500">{form.errors.priority}</small>}
        </FormControl>
        <FormControl className="col-span-1">
          <InputLabel id="status-form-label">Status</InputLabel>
          <Select
            labelId="status-form-label"
            id="status-form-select"
            label="Status"
            defaultValue="0"
            {...form.getInputProps("status")}
          >
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Select>
          {form.errors?.status && <small className="text-red-500">{form.errors.status}</small>}
        </FormControl>
        <FormControl fullWidth className="col-start-1 col-span-4">
          <TextField
            id="title-form-input"
            label="Title"
            placeholder="Add a meaningful title for your task."
            multiline
            rows={4}
            defaultValue=""
            {...form.getInputProps("title")}
          />
          {form.errors?.title && <small className="text-red-500">{form.errors.title}</small>}
        </FormControl>
        {createdAt && (
          <FormControl fullWidth className="col-start-1 col-span-2" disabled>
            <DatePicker
              label="Date Created"
              value={createdAt}
              disabled
            />
          </FormControl>
        )}
        <FormControl fullWidth className="col-span-2">
          <DatePicker
            label="Due Date"
            minDate={toDayjs(convertUtcToUserTimezone(getUtcDate()))}
            {...form.getInputProps("dueAt")}
          />
          {form.errors?.dueAt && <small className="text-red-500">{form.errors.dueAt}</small>}
        </FormControl>
        <FormControl fullWidth className="col-span-4">
          <TextField
            id="details-form-input"
            label="Details"
            placeholder="Add meaningful details."
            multiline
            rows={4}
            defaultValue=""
            {...form.getInputProps("details")}
          />
          {form.errors?.details && <small className="text-red-500">{form.errors.details}</small>}
        </FormControl>
      </div>
    </div>
  );
}

export default TodoForm;