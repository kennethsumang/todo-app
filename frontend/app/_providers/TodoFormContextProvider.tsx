"use client";

import { useForm } from '@mantine/form';
import { TodoForm } from '../_types/todo';
import { TodoFormProvider } from '../_contexts/todo-form.context';
import { initialFormValues } from '../_store/todo.store';
import { convertUtcToUserTimezone, getUtcDate, isBefore, isValidDate } from '../_libs/date';

interface Props {
  children: React.ReactNode;
}

const TodoFormContextProvider: React.FC<Props> = ({ children }) => {
  // Create form as described in use-form documentation
  const form = useForm<TodoForm>({
    mode: 'uncontrolled',
    initialValues: initialFormValues,
    validate: {
      title: (value) => {
        if (!value) {
          return "Invalid title.";
        }

        if (value.length > 25) {
          return "Title must only be 25 characters or less.";
        }

        return null;
      },
      details: (value) => {
        if (!value) {
          return "Invalid details.";
        }

        if (value.length > 25) {
          return "Detail must only be 300 characters or less.";
        }
        
        return null;
      },
      priority: (value) => {
        const data = Number(value);
        if (Number.isNaN(value)) {
          return "Invalid priority.";
        }
        return data >= 0 && data <= 2 ? null : "Invalid priority.";
      },
      status: (value) => {
        const data = Number(value);
        if (Number.isNaN(value)) {
          return "Invalid status.";
        }
        return data >= 0 && data <= 3 ? null : "Invalid status.";
      },
      dueAt: (value) => {
        if (!value || isValidDate(value)) {
          return "Invalid due date.";
        }

        if (isBefore(value, convertUtcToUserTimezone(getUtcDate()))) {
          return "Due date must not be a past date.";
        }

        return null;
      },
    },
  });

  return (
    <TodoFormProvider form={form}>
      {children}
    </TodoFormProvider>
  );
}

export default TodoFormContextProvider;