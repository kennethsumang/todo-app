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

describe('TodoService.createTodo', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let todoRepository: sinon.SinonStubbedInstance<TodoRepository>;
  let todoService: TodoService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    todoRepository = sinon.createStubInstance(TodoRepository)

    // Inject the mock into the service
    todoService = new TodoService(userRepositoryMock, todoRepository);
  });

  it('should return the new todo when the request is valid', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      title: "Todo 1",
      details: "Todo 1 Details",
      status: "NOT_STARTED",
      priority: "LOW",
      dueAt: dueAt,
    };
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
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    const response = await todoService.createTodo(todoFormData, userId);
    expect(response).to.deep.equal(mockTodo);
  });

  it('should throw an exception when userId is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      title: "Todo 1",
      details: "Todo 1 Details",
      status: "NOT_STARTED",
      priority: "LOW",
      dueAt: dueAt,
    };
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodo = {
      id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
      userId: "8ba384bc-0373-462b-8196-d35af7813739",
      title: "Todo 1",
      details: "Todo 1 Details",
      priority: $Enums.TodoPriority.LOW,
      status: $Enums.TodoStatus.NOT_STARTED,
      createdAt: getUtcDate(),
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    await expect(todoService.createTodo(todoFormData, undefined)).to.be.rejectedWith('Missing userId.');
  });

  it('should throw an exception when the todo title is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      details: "Todo 1 Details",
      status: "NOT_STARTED",
      priority: "LOW",
      dueAt: dueAt,
    };
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
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    await expect(todoService.createTodo(todoFormData, userId)).to.be.rejectedWith('Title is required.');
  });

  it('should throw an exception when the todo detail is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      title: "Todo 1",
      status: "NOT_STARTED",
      priority: "LOW",
      dueAt: dueAt,
    };
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
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    await expect(todoService.createTodo(todoFormData, userId)).to.be.rejectedWith('Details is required.');
  });

  it('should throw an exception when the todo due date is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      title: "Todo 1",
      details: "Todo 1 Details",
      status: "NOT_STARTED",
      priority: "LOW",
    };
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
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    await expect(todoService.createTodo(todoFormData, userId)).to.be.rejectedWith('DueAt is required.');
  });

  it('should throw an exception when the todo priority is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      title: "Todo 1",
      details: "Todo 1 Details",
      status: "NOT_STARTED",
      dueAt: dueAt,
    };
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
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    await expect(todoService.createTodo(todoFormData, userId)).to.be.rejectedWith('Priority is required.');
  });

  it('should throw an exception when todo status is missing', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      title: "Todo 1",
      details: "Todo 1 Details",
      dueAt: dueAt,
      priority: "LOW",
    };
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
      "dueAt": dueAt,
      "completedAt": null,
      "updatedAt": null
    }

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.createTodo.resolves(mockTodo);

    await expect(todoService.createTodo(todoFormData, userId)).to.be.rejectedWith('Status is required.');
  });
});