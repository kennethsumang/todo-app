import { inject, injectable } from "inversify";
import UserRepository from "../repositories/user.repository";
import TodoRepository from "../repositories/todo.repository";
import { Todo } from "@prisma/client";
import CreateTodoValidator from "../validators/todo/createTodo.validator";
import { CreateTodoDto } from "../dtos/todo/createTodo.dto";
import BadRequestError from "../exceptions/badRequest.error";
import UpdateTodoValidator from "../validators/todo/updateTodo.validator";
import { UpdateTodoDto } from "../dtos/todo/updateTodo.dto";
import ServerError from "../exceptions/server.error";
import FetchTodoValidator from "../validators/todo/fetchTodo.validator";
import FetchTodoDto from "../dtos/todo/fetchTodo.dto";

@injectable()
export default class TodoService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  /**
   * Creates a new record
   * @param {Record<string, unknown>} data
   * @param {string|undefined} userId
   */
  async createTodo(data: Record<string, unknown>, userId: string|undefined): Promise<Todo> {
    const validated = (new CreateTodoValidator).validate<CreateTodoDto>(data);

    // check user
    if (!userId) {
      throw new BadRequestError('Missing userId.');
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestError('User not found.');
    }

    return await this.todoRepository.createTodo(validated, userId);
  }

  /**
   * Fetch todos
   * @param {Record<string, unknown>} filters
   * @param {string|undefined} userId
   */
  async fetchTodo(filters: Record<string, unknown>, userId: string|undefined): Promise<Todo[]> {
    if (!userId) {
      throw new BadRequestError('Missing userId.');
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestError('User not found.');
    }

    const validated = (new FetchTodoValidator).validate<FetchTodoDto>(filters);
    validated.page = validated.page ?? 1;
    validated.limit = validated.limit ?? 10;
    console.log(validated);
    return await this.todoRepository.fetchTodos(validated, userId);
  }

  /**
   * Fetch specific record
   * @param {string|undefined} todoId
   * @param {string|undefined} userId
   */
  async fetchSpecificTodo(todoId: string|undefined, userId: string|undefined): Promise<Todo> {
    if (!userId) {
      throw new BadRequestError('Missing userId.');
    }

    if (!todoId) {
      throw new BadRequestError('Missing todoId.');
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestError('User not found.');
    }

    const todo = await this.todoRepository.getTodoById(todoId, userId);
    if (!todo) {
      throw new BadRequestError('Todo not found.');
    }

    return todo;
  }

  /**
   * Updates a record
   * @param {string|undefined} todoId
   * @param {Record<string, unknown>} data
   * @param {string|undefined} userId
   */
  async updateTodo(todoId: string|undefined, data: Record<string, unknown>, userId: string|undefined): Promise<Todo> {
    if (!todoId) {
      throw new BadRequestError('Missing todoId.');
    }

    if (!userId) {
      throw new BadRequestError('Missing userId.');
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestError('User not found.');
    }

    const todo = await this.todoRepository.getTodoById(todoId, userId);
    if (!todo) {
      throw new BadRequestError('Todo not found.');
    }
    
    const validated = (new UpdateTodoValidator).validate<UpdateTodoDto>(data);

    return await this.todoRepository.updateTodo(todoId, validated, userId);
  }

  /**
   * Delete a record
   * @param {string|undefined} todoId
   * @param {string|undefined} userId
   */
  async deleteTodo(todoId: string|undefined, userId: string|undefined): Promise<{ result: boolean }> {
    if (!todoId) {
      throw new BadRequestError('Missing todoId.');
    }

    if (!userId) {
      throw new BadRequestError('Missing userId.');
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestError('User not found.');
    }

    const todo = await this.todoRepository.getTodoById(todoId, userId);
    if (!todo) {
      throw new BadRequestError('Todo not found.');
    }

    const deletedTodo = await this.todoRepository.deleteTodo(todoId, userId);
    if (!deletedTodo) {
      throw new ServerError('Todo deletion failed.');
    }

    return { result: true };
  }
}