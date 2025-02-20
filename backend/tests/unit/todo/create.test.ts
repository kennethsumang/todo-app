import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import TodoService from '../../../src/services/todo.service';
import UserRepository from '../../../src/repositories/user.repository';
import chaiAsPromised from 'chai-as-promised';
import _ from 'lodash';
import TodoRepository from '../../../src/repositories/todo.repository';

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

  });

  it('should throw an exception when userId is missing', async () => {

  });

  it('should throw an exception when the todo title is missing', async () => {

  });

  it('should throw an exception when the todo detail is missing', async () => {

  });

  it('should throw an exception when the todo due date is missing', async () => {

  });

  it('should throw an exception when the todo priority is missing', async () => {

  });

  it('should throw an exception when todo status is missing', async () => {

  });
});