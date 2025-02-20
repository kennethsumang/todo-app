import { inject, injectable } from "inversify";
import UserRepository from "../repositories/user.repository";
import TodoRepository from "../repositories/todo.repository";
import { Todo } from "@prisma/client";

@injectable()
export default class TodoService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  async createTodo(data: Record<string, unknown>, userId: string|undefined): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  async fetchTodo(filters: Record<string, unknown>, userId: string|undefined): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }

  async updateTodo(todoId: string|undefined, data: Record<string, unknown>, userId: string|undefined): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  async deleteTodo(todoId: string|undefined, userId: string|undefined): Promise<{ result: boolean }> {
    throw new Error('Method not implemented.');
  }
}