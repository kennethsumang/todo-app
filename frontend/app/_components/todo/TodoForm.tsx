"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { TodoForm as TodoFormInterface } from "@/app/_types/todo";
import { convertUtcToUserTimezone, getUtcDate, toDayjs } from "@/app/_libs/date";

interface Props {
  isCreate: boolean;
  createdAt?: Dayjs;
  form: TodoFormInterface;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setForm: (key: string, value: any) => void;
  errors: Record<string, string[]>;
  removeError: (key: string) => void;
}

const TodoForm: React.FC<Props> = (props) => {
  return (
    <div className="pl-24 pr-24 pt-8">
      <div className="grid grid-cols-4 gap-3">
        <FormControl className="col-span-4 lg:col-span-1" disabled={!props.isCreate}>
          <InputLabel id="priority-form-label">Priority</InputLabel>
          <Select
            labelId="priority-form-label"
            id="priority-form-select"
            label="Priority"
            error={!!props.errors?.priority}
            value={props.form.priority?.toString()}
            onChange={(e) => props.setForm("priority", e.target.value)}
            onFocus={() => props.removeError("priority")}
          >
            <MenuItem value={0}>Low</MenuItem>
            <MenuItem value={1}>High</MenuItem>
            <MenuItem value={2}>Critical</MenuItem>
          </Select>
          {props.errors?.priority && <small className="text-red-500">{props.errors.priority[0]}</small>}
        </FormControl>
        <FormControl className="col-span-4 lg:col-span-1">
          <InputLabel id="status-form-label">Status</InputLabel>
          <Select
            labelId="status-form-label"
            id="status-form-select"
            label="Status"
            error={!!props.errors?.status}
            value={props.form.status?.toString()}
            onChange={(e) => props.setForm("status", e.target.value)}
            onFocus={() => props.removeError("status")}
          >
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Select>
          {props.errors?.status && <small className="text-red-500">{props.errors.status[0]}</small>}
        </FormControl>
        <FormControl fullWidth className="col-start-1 col-span-4">
          <TextField
            id="title-form-input"
            label="Title"
            placeholder="Add a meaningful title for your task."
            multiline
            rows={4}
            error={!!props.errors?.title}
            value={props.form.title}
            onChange={(e) => props.setForm("title", e.target.value)}
            onFocus={() => props.removeError("title")}
          />
          {props.errors?.title && <small className="text-red-500">{props.errors.title[0]}</small>}
        </FormControl>
        <FormControl fullWidth className="col-start-1 col-span-4 lg:col-span-2" disabled>
          <DatePicker
            label="Date Created"
            value={props.createdAt}
            disabled
          />
        </FormControl>
        <FormControl fullWidth className="col-span-4 lg:col-span-2">
          <DatePicker
            label="Due Date"
            minDate={toDayjs(convertUtcToUserTimezone(getUtcDate()))}
            // slotProps={{
            //   textField: {
            //     helperText: props.errors?.dueAt?.[0]
            //   }
            // }}
            value={props.form.dueAt}
            onChange={(value) => props.setForm("dueAt", value)}
            onOpen={() => props.removeError("dueAt")}
          />
          {props.errors?.dueAt && <small className="text-red-500">{props.errors.dueAt[0]}</small>}
        </FormControl>
        <FormControl fullWidth className="col-span-4">
          <TextField
            id="details-form-input"
            label="Details"
            placeholder="Add meaningful details."
            multiline
            rows={4}
            error={!!props.errors?.details}
            value={props.form.details}
            onChange={(e) => props.setForm("details", e.target.value)}
            onFocus={() => props.removeError("details")}
          />
          {props.errors?.details && <small className="text-red-500">{props.errors.details[0]}</small>}
        </FormControl>
      </div>
    </div>
  );
}

export default TodoForm;