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

interface TodoStore {
  todos: TodoItem[];
  filters: TodoFilters;
  form: TodoForm;
  fetchTodos: () => Promise<void>;
  setFilter: (key: string, value: string | number) => void;
  setForm: (data: TodoItem) => void;
  setFormValue: (key: TodoFormKeys, value: TodoFormValues) => void;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filters: {},
  form: {
    title: "",
    details: "",
    priority: 0,
    status: 0,
    dueAt: new Date(),
  },
  fetchTodos: async () => {
    const data = await requestTodoList(get().filters);
    set({ todos: data.todos });
  },
  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } });
  },
  setForm: (data: TodoItem) => {
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
