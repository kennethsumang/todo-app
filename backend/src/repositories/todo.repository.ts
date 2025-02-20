import { PrismaClient, Todo } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CreateTodoDto } from "../dtos/todo/createTodo.dto";
import { getUtcDate } from "../utils/date.util";

@injectable()
export default class TodoRepository {
  constructor(@inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async createTodo(data: CreateTodoDto, userId: string): Promise<Todo> {
    return await this.prisma
      .todo
      .create({
        data: {
          ...data,
          createdAt: getUtcDate(),
          user: { connect: { id: userId } }
        },
      })
  }

  async fetchTodos(userId: string): Promise<Todo[]> {
    return await this.prisma
      .todo
      .findMany({ where: { userId }});
  }
}