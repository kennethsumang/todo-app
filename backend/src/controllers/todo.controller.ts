import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TodoService from "../services/todo.service";

@injectable()
export default class TodoController {
  constructor(@inject(TodoService) private readonly todoService: TodoService) {}

  async create(req: Request, res: Response) {
    return this.todoService.createTodo(req.body, req.user?.id);
  }

  async update(req: Request, res: Response) {
    return this.todoService.updateTodo(req.params?.todoId, req.body, req.user?.id);
  }

  async fetch(req: Request, res: Response) {
    return this.todoService.fetchTodo(req.query, req.user?.id);
  }

  async remove(req: Request, res: Response) {
    return this.todoService.deleteTodo(req.params?.todoId, req.user?.id);
  }
}