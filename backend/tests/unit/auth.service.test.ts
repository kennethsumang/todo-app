import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../src/services/auth.service';
import UserRepository from '../../src/repositories/user.repository';
import AuthRepository from '../../src/repositories/auth.repository';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('AuthService', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let authRepositoryMock: sinon.SinonStubbedInstance<AuthRepository>;
  let authService: AuthService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    authRepositoryMock = {}

    // Inject the mock into the service
    authService = new AuthService(authRepositoryMock, userRepositoryMock);
  });

  it('should return user data when the user is successfully created', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
      retypePassword: 'newpassword',
    };

    const response = await authService.register(requestData);
    expect(response).to.deep.equal(mockUser);
  });

  it('should throw an exception when the request is missing the username field', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      password: 'newpassword',
      retypePassword: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Missing username.');
  });

  it('should throw an exception when the request is missing the password field', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      username: 'newuser',
      retypePassword: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Missing password.');
  });

  it('should throw an exception when the request is missing the retypePassword field', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Missing retyped password.');
  });

  it('should throw an exception when the request has mismatched password and retypePassword fields', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
      retypePassword: 'notthesamepassword'
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Passwords do not match.');
  });

  it('should throw an exception when the user with the supplied username is already existing', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(mockUser);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
      retypePassword: 'newpassword',
    };

    await expect(authService.register(requestData)).to.be.rejectedWith('User with that username already exists.');
  });
});
