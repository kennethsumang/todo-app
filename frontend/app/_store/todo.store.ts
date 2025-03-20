import { create } from "zustand";
import {
  TodoFilters,
  TodoForm,
  TodoFormKeys,
  TodoFormValues,
  TodoItem,
} from "../_types/todo";
import requestTodoList from "../_requests/todo/fetch-todos.request";
import _ from "lodash";
import { toDayjs } from "../_libs/date";

interface TodoStore {
  todos: TodoItem[];
  filters: TodoFilters;
  form: TodoForm;
  fetchTodos: () => Promise<void>;
  setFilter: (key: string, value: string | number) => void;
  setForm: (data: TodoForm) => void;
  setFormValue: (key: TodoFormKeys, value: TodoFormValues) => void;
}

export const initialFormValues = {
  title: "",
  details: "",
  priority: 0,
  status: 0,
  dueAt: toDayjs(new Date()),
};

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filters: {},
  form: initialFormValues,
  fetchTodos: async () => {
    const data = await requestTodoList(get().filters);
    set({ todos: data.todos });
  },
  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } });
  },
  setForm: (data: TodoForm) => {
    set({
      form: {
        ...get().form,
        ..._.pick(data, Object.keys(get().form)),
      },
    });
  },
  setFormValue: (key: TodoFormKeys, value: TodoFormValues) => {
    set({ form: { ...get().form, [key]: value } });
  },
}));

export default useTodoStore;
