import { useMutation } from "@tanstack/react-query";
import Joi from "joi";
import _ from "lodash";
import { useState } from "react";
import { TodoForm } from "../_types/todo";
import { initialFormValues } from "../_store/todo.store";
import { useRouter } from "next/navigation";
import requestUpdateTodo from "../_requests/todo/edit-todo.request";
import {
  convertUtcToUserTimezone,
  getUtcDate,
  isBefore,
  isValidDate,
} from "../_libs/date";

export default function useUpdateTodoForm(todoId: string) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [form, setForm] = useState<TodoForm>({ ...initialFormValues });
  const router = useRouter();
  const schema = Joi.object({
    title: Joi.string().max(15).required().messages({
      "any.required": "Title is required.",
      "string.max": "Title must be 15 characters or less.",
      "string.base": "Title is invalid.",
      "string.empty": "Title is required.",
    }),
    details: Joi.string().max(300).required().messages({
      "any.required": "Detail is required.",
      "string.max": "Detail must be 300 characters or less.",
      "string.base": "Detail is invalid.",
      "string.empty": "Detail is required.",
    }),
    status: Joi.number().min(0).max(3).required().messages({
      "any.required": "Status is required.",
      "number.min": "Status is invalid.",
      "number.max": "Status is invalid.",
      "number.base": "Status is invalid.",
    }),
    priority: Joi.number().min(0).max(2).required().messages({
      "any.required": "Priority is required.",
      "number.min": "Priority is invalid.",
      "number.max": "Priority is invalid.",
      "number.base": "Priority is invalid.",
    }),
    dueAt: Joi.any()
      .required()
      .custom((value, helper) => {
        if (!value || !isValidDate(value)) {
          return helper.message({ custom: "Invalid due date." });
        }

        if (isBefore(value, convertUtcToUserTimezone(getUtcDate()))) {
          return helper.message({
            custom: "Due date must not be a past date.",
          });
        }

        return null;
      }),
  });
  const { mutateAsync } = useMutation({
    mutationFn: () => requestUpdateTodo(todoId, form),
    onSuccess: (data) => {
      router.push(`/todos/${data.todo.id}`);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setFormValue(key: string, value: any) {
    setForm({ ...form, [key]: value });
  }

  function validate(data: Record<string, unknown>): boolean {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) {
      return true;
    }

    const newErrorList: Record<string, string[]> = {};
    _.forEach(error.details, (errorData) => {
      const path = errorData.path.toString();
      if (!newErrorList[path]) {
        newErrorList[path] = [errorData.message];
      } else {
        newErrorList.path.push(errorData.message);
      }
    });

    setErrors(newErrorList);
    return false;
  }

  return {
    errors,
    setErrors,
    validate,
    form,
    setForm: setFormValue,
    setInitialValues: (values: TodoForm) => setForm(values),
    mutate: mutateAsync,
  };
}
