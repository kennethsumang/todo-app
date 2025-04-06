import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TodoService from "../services/todo.service";

@injectable()
export default class TodoController {
  constructor(@inject(TodoService) private readonly todoService: TodoService) {}

  async create(req: Request, res: Response) {
    const todo = await this.todoService.createTodo(req.body, req.user?.id);
    return { todo: todo };
  }

  async update(req: Request, res: Response) {
    const todo = await this.todoService.updateTodo(req.params?.todoId, req.body, req.user?.id);
    return { todo: todo };
  }

  async fetch(req: Request, res: Response) {
    const result = await this.todoService.fetchTodo(req.query, req.user?.id);
    return { todos: result.data, count: result.count };
  }

  async fetchSpecificTodo(req: Request, res: Response) {
    const todo = await this.todoService.fetchSpecificTodo(req.params?.todoId, req.user?.id);
    return { todo };
  }

  async remove(req: Request, res: Response) {
    return this.todoService.deleteTodo(req.params?.todoId, req.user?.id);
  }

  async removeMultiple(req: Request, res: Response) {
    return this.todoService.deleteMultipleTodo((req.query as Record<string, string>)?.todoIds, req.user?.id);
  }
}