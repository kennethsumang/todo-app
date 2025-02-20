import { inject, injectable } from "inversify";
import UserRepository from "../repositories/user.repository";
import TodoRepository from "../repositories/todo.repository";

@injectable()
export default class TodoService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}
}