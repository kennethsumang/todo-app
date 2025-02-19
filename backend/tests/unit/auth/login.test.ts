import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../../src/services/auth.service';
import UserRepository from '../../../src/repositories/user.repository';
import AuthRepository from '../../../src/repositories/auth.repository';
import chaiAsPromised from 'chai-as-promised';
import JwtUtil from '../../../src/utils/jwt.util';
import _ from 'lodash';

chai.use(chaiAsPromised);

describe('AuthService.login', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let authRepositoryMock: sinon.SinonStubbedInstance<AuthRepository>;
  let jwtUtilMock: sinon.SinonStubbedInstance<JwtUtil>;
  let authService: AuthService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    authRepositoryMock = {}
    jwtUtilMock = sinon.createStubInstance(JwtUtil);

    // Inject the mock into the service
    authService = new AuthService(authRepositoryMock, userRepositoryMock, jwtUtilMock);
  });

  it('should return user data and token when login is successful', async () => {
    const mockUser = { id: 1, username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
    };

    const response = await authService.login(requestData);
    expect(response).to.deep.equal({
      user: _.omit(mockUser, 'password'),
      token: 'token',
    });
  });

  it('should throw an error when username is not defined in request', async () => {
    const mockUser = { id: 1, username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')

    const requestData = {
      password: 'newpassword',
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('Missing username.');
  });

  it('should throw an error when password is not defined in request', async () => {
    const mockUser = { id: 1, username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')

    const requestData = {
      username: 'newuser',
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('Missing password.');
  });

  it('should throw an error when username and password is not defined in request', async () => {
    const mockUser = { id: 1, username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')

    const requestData = {};

    await expect(authService.login(requestData)).to.be.rejectedWith('Missing username. Missing password.');
  });

  it('should throw an error when user does not exist', async () => {
    userRepositoryMock.getUserByUsername.resolves(null);
    jwtUtilMock.create.resolves('token')

    const requestData = {
      username: 'newuser',
      password: 'newpassword'
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('User does not exist.');
  });
});
