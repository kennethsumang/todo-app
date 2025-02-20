import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TodoService from "../services/todo.service";

@injectable()
export default class TodoController {
  constructor(@inject(TodoService) private readonly todoService: TodoService) {}

  async create(req: Request, res: Response) {
    //
  }

  async update(req: Request, res: Response) {
    //
  }

  async fetch(req: Request, res: Response) {
    //
  }

  async remove(req: Request, res: Response) {
    //
  }
}