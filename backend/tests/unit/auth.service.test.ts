import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../src/services/auth.service';
import { UserRepositoryInterface } from '../../src/repositories/user.repository';
import { AuthRepositoryInterface } from '../../src/repositories/auth.repository';
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe('AuthService', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepositoryInterface>;
  let authRepositoryMock: sinon.SinonStubbedInstance<AuthRepositoryInterface>;
  let authService: AuthService;

  beforeEach(() => {
    // Create a mock instance of UserRepository
    userRepositoryMock = {
      createUser: sinon.stub(),
    };
    authRepositoryMock = {}

    // Inject the mock into the service
    authService = new AuthService(authRepositoryMock, userRepositoryMock);
  });

  it('should return user data when the user is successfully created', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);

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

    const requestData = {
      password: 'newpassword',
      retypePassword: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith("Missing username.");
  });

  it('should throw an exception when the request is missing the password field', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);

    const requestData = {
      username: 'newuser',
      retypePassword: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith("Missing password.");
  });

  it('should throw an exception when the request is missing the retypePassword field', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith("Missing retyped password.");
  });

  it('should throw an exception when the request has mismatched password and retypePassword fields', async () => {
    const mockUser = { id: 1, username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
      retypePassword: 'notthesamepassword'
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith("Passwords do not match.");
  });
});
