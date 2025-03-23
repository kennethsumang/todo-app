import { PrismaClient, Todo } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CreateTodoDto } from "../dtos/todo/createTodo.dto";
import { getUtcDate } from "../utils/date.util";
import { UpdateTodoDto } from "../dtos/todo/updateTodo.dto";
import FetchTodoDto from "../dtos/todo/fetchTodo.dto";

@injectable()
export default class TodoRepository {
  constructor(@inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async createTodo(data: CreateTodoDto, userId: string): Promise<Todo> {
    return this.prisma
      .todo
      .create({
        data: {
          ...data,
          createdAt: getUtcDate(),
          user: { connect: { id: userId } }
        },
      })
  }

  async fetchTodos(filters: FetchTodoDto, userId: string): Promise<Todo[]> {
    const whereQuery: Record<string, any> = { userId };
    if (filters.id) {
      whereQuery.id = filters.id;
    }

    if (filters.priority !== undefined) {
      whereQuery.priority = filters.priority;
    }

    if (filters.status !== undefined) {
      whereQuery.status = filters.status;
    }

    if (filters.title) {
      whereQuery.title = {
        contains: filters.title,
      };
    }

    if (filters.details) {
      whereQuery.details = {
        contains: filters.details,
      };
    }
    
    return this.prisma
      .todo
      .findMany({
        where: whereQuery,
        skip: (filters.page! - 1) * filters.limit!,
        take: filters.limit!,
        orderBy: {
          createdAt: 'desc'
        }
      });
  }

  async getTodoById(todoId: string, userId: string): Promise<Todo|null> {
    return this.prisma
      .todo
      .findFirst({
        where: {
          id: todoId,
          userId: userId,
        },
      });
  }

  async updateTodo(todoId: string, data: UpdateTodoDto, userId: string): Promise<Todo> {
    return this.prisma
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
    return this.prisma
      .todo
      .delete({
        where: {
          id: todoId,
          userId: userId,
        }
      });
  }
}