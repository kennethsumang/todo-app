import { create } from "zustand";
import { TodoFilters, TodoItem } from "../_types/todo";
import requestTodoList from "../_requests/todo/fetch-todos.request";

interface TodoStore {
  todos: TodoItem[];
  filters: TodoFilters;
  fetchTodos: () => Promise<void>;
  setFilter: (key: string, value: string | number) => void;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filters: {},
  fetchTodos: async () => {
    const data = await requestTodoList(get().filters);
    set({ todos: data.todos });
  },
  setFilter: (key, value) => {
    set({ filters: { ...get().filters, [key]: value } });
  },
}));

export default useTodoStore;
