import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import TodoService from '../../../src/services/todo.service';
import UserRepository from '../../../src/repositories/user.repository';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';
import TodoRepository from '../../../src/repositories/todo.repository';
import { addToCurrentDate, getUtcDate } from '../../../src/utils/date.util';
import { priorities, statuses } from '../../../src/constants/todo.constant';

chai.use(chaiAsPromised);

describe('TodoService.updateTodo', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let todoRepository: sinon.SinonStubbedInstance<TodoRepository>;
  let todoService: TodoService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    todoRepository = sinon.createStubInstance(TodoRepository)

    // Inject the mock into the service
    todoService = new TodoService(userRepositoryMock, todoRepository);
  });

  it('should return the updated todo when the request is valid and the detail is updated', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      details: "Todo 1 Details",
    };
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodoList = [
      {
        id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
        userId: "8ba384bc-0373-462b-8196-d35af7813739",
        title: "Todo 1",
        details: "Todo 1 Details",
        priority: priorities.LOW,
        status: statuses.NOT_STARTED,
        createdAt: getUtcDate(),
        "dueAt": dueAt,
        "completedAt": null,
        "updatedAt": null
      }
    ];
    const mockUpdatedTodo = { ...mockTodoList[0], details: todoFormData.details };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodoList[0]);
    todoRepository.updateTodo.resolves(mockUpdatedTodo);

    const response = await todoService.updateTodo(todoId, todoFormData, userId);
    expect(response).to.deep.equal(mockUpdatedTodo);
  });

  it('should return the updated todo when the request is valid and the status is updated', async () => {
    const dueAt = addToCurrentDate(30);
    const todoFormData = {
      status: statuses.IN_PROGRESS
    };
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodoList = [
      {
        id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
        userId: "8ba384bc-0373-462b-8196-d35af7813739",
        title: "Todo 1",
        details: "Todo 1 Details",
        priority: priorities.LOW,
        status: statuses.NOT_STARTED,
        createdAt: getUtcDate(),
        "dueAt": dueAt,
        "completedAt": null,
        "updatedAt": null
      }
    ];
    const mockUpdatedTodo = { ...mockTodoList[0], status: todoFormData.status };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodoList[0]);
    todoRepository.updateTodo.resolves(mockUpdatedTodo);

    const response = await todoService.updateTodo(todoId, todoFormData, userId);
    expect(response).to.deep.equal(mockUpdatedTodo);
  });

  it('should return the updated todo when the request is valid and the dueAt is updated', async () => {
    const dueAt = addToCurrentDate(30);
    const newDueAt = addToCurrentDate(60);
    const todoFormData = {
      dueAt: newDueAt
    };
    const todoId = '6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177';
    const userId = '8ba384bc-0373-462b-8196-d35af7813739';
    const mockUser = { id: '8ba384bc-0373-462b-8196-d35af7813739', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    const mockTodoList = [
      {
        id: "6f83a4e6-bd31-4fa1-a15b-66ffcb5ad177",
        userId: "8ba384bc-0373-462b-8196-d35af7813739",
        title: "Todo 1",
        details: "Todo 1 Details",
        priority: priorities.LOW,
        status: statuses.NOT_STARTED,
        createdAt: getUtcDate(),
        "dueAt": dueAt,
        "completedAt": null,
        "updatedAt": null
      }
    ];
    const mockUpdatedTodo = { ...mockTodoList[0], dueAt: todoFormData.dueAt };

    userRepositoryMock.getUserById.resolves(mockUser);
    todoRepository.getTodoById.resolves(mockTodoList[0]);
    todoRepository.updateTodo.resolves(mockUpdatedTodo);

    const response = await todoService.updateTodo(todoId, todoFormData, userId);
    expect(response).to.deep.equal(mockUpdatedTodo);
  });
});