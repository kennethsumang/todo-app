import { PrismaClient, Todo } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CreateTodoDto } from "../dtos/todo/createTodo.dto";
import { getUtcDate } from "../utils/date.util";
import { UpdateTodoDto } from "../dtos/todo/updateTodo.dto";

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

  async getTodoById(todoId: string, userId: string): Promise<Todo|null> {
    return await this.prisma
      .todo
      .findFirst({
        where: {
          id: todoId,
          userId: userId,
        },
      });
  }

  async updateTodo(todoId: string, data: UpdateTodoDto, userId: string): Promise<Todo> {
    return await this.prisma
      .todo
      .update({
        where: {
          id: todoId,
          userId: userId,
        },
        data: {
          ...data,
          updatedAt: getUtcDate(),
        },
      });
  }

  async deleteTodo(todoId: string, userId: string): Promise<Todo> {
    return await this.prisma
      .todo
      .delete({
        where: {
          id: todoId,
          userId: userId,
        }
      });
  }
}