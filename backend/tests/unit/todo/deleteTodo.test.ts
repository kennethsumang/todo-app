import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import TodoService from '../../../src/services/todo.service';
import UserRepository from '../../../src/repositories/user.repository';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';
import TodoRepository from '../../../src/repositories/todo.repository';
import { addToCurrentDate, getUtcDate } from '../../../src/utils/date.util';
import { $Enums } from '@prisma/client';

chai.use(chaiAsPromised);

describe('TodoService.deleteTodo', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let todoRepository: sinon.SinonStubbedInstance<TodoRepository>;
  let todoService: TodoService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    todoRepository = sinon.createStubInstance(TodoRepository)

    // Inject the mock into the service
    todoService = new TodoService(userRepositoryMock, todoRepository);
  });

  it('should return successful when the todo is deleted successfully', async () => {
    const dueAt = addToCurrentDate(30);
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodo = {
      id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
      userId: "8ba384bc-0373-462b-8196-d35af7813739",
      title: "Todo 1",
      details: "Todo 1 Details",
      priority: $Enums.TodoPriority.LOW,
      status: $Enums.TodoStatus.NOT_STARTED,
      createdAt: getUtcDate(),
      dueAt: dueAt,
      completedAt: null,
      updatedAt: null
    };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodo);
    todoRepository.deleteTodo.resolves(mockTodo);

    const response = await todoService.deleteTodo(todoId, userId);
    expect(response).to.deep.equal({ result: true });
  });

  it('should throw an error when todoId is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoId = undefined;
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodo = {
      id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
      userId: "8ba384bc-0373-462b-8196-d35af7813739",
      title: "Todo 1",
      details: "Todo 1 Details",
      priority: $Enums.TodoPriority.LOW,
      status: $Enums.TodoStatus.NOT_STARTED,
      createdAt: getUtcDate(),
      dueAt: dueAt,
      completedAt: null,
      updatedAt: null
    };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodo);
    todoRepository.deleteTodo.resolves(mockTodo);

    await expect(todoService.deleteTodo(todoId, userId)).to.be.rejectedWith('Missing todoId.');
  });

  it('should throw an error when userId is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = undefined;
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodo = {
      id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
      userId: "8ba384bc-0373-462b-8196-d35af7813739",
      title: "Todo 1",
      details: "Todo 1 Details",
      priority: $Enums.TodoPriority.LOW,
      status: $Enums.TodoStatus.NOT_STARTED,
      createdAt: getUtcDate(),
      dueAt: dueAt,
      completedAt: null,
      updatedAt: null
    };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodo);
    todoRepository.deleteTodo.resolves(mockTodo);

    await expect(todoService.deleteTodo(todoId, userId)).to.be.rejectedWith('Missing userId.');
  });

  it('should throw an error when todo with the supplied todoId does not exist in DB', async () => {
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodo = null;

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodo);
    todoRepository.deleteTodo.resolves(undefined);

    await expect(todoService.deleteTodo(todoId, userId)).to.be.rejectedWith('Todo not found.');
  });

  it('should throw an exception when user with the supplied userId does not exist in DB', async () => {
    const dueAt = addToCurrentDate(30);
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = null;
    const mockTodo = {
      id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
      userId: "8ba384bc-0373-462b-8196-d35af7813739",
      title: "Todo 1",
      details: "Todo 1 Details",
      priority: $Enums.TodoPriority.LOW,
      status: $Enums.TodoStatus.NOT_STARTED,
      createdAt: getUtcDate(),
      dueAt: dueAt,
      completedAt: null,
      updatedAt: null
    };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodo);
    todoRepository.deleteTodo.resolves(mockTodo);

    await expect(todoService.deleteTodo(todoId, userId)).to.be.rejectedWith('User not found.');
  });
});