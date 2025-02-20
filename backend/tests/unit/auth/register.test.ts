import 'reflect-metadata';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import AuthService from '../../../src/services/auth.service';
import UserRepository from '../../../src/repositories/user.repository';
import RefreshTokenRepository from '../../../src/repositories/refreshToken.repository';
import chaiAsPromised from 'chai-as-promised';
import JwtUtil from '../../../src/utils/jwt.util';
import _ from 'lodash';
import HashUtil from '../../../src/utils/hash.util';
import StringUtil from '../../../src/utils/string.util';

chai.use(chaiAsPromised);

describe('AuthService.register', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let refreshTokenRepositoryMock: sinon.SinonStubbedInstance<RefreshTokenRepository>;
  let jwtUtilMock: sinon.SinonStubbedInstance<JwtUtil>;
  let hashUtilMock: sinon.SinonStubbedInstance<HashUtil>;
  let stringUtilMock: sinon.SinonStubbedInstance<StringUtil>;
  let authService: AuthService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    refreshTokenRepositoryMock = sinon.createStubInstance(RefreshTokenRepository);
    jwtUtilMock = {} as unknown as sinon.SinonStubbedInstance<JwtUtil>;
    hashUtilMock = sinon.createStubInstance(HashUtil);
    stringUtilMock = {} as unknown as sinon.SinonStubbedInstance<StringUtil>;

    // Inject the mock into the service
    authService = new AuthService(refreshTokenRepositoryMock, userRepositoryMock, jwtUtilMock, hashUtilMock, stringUtilMock);
  });

  it('should return user data when the user is successfully created', async () => {
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);
    hashUtilMock.hash.resolves('newpasswordhashed');

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
      retypePassword: 'newpassword',
    };

    const response = await authService.register(requestData);
    expect(response).to.deep.equal(mockUser);
  });

  it('should throw an exception when the request is missing the username field', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      password: 'newpassword',
      retypePassword: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Missing username.');
  });

  it('should throw an exception when the request is missing the password field', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      username: 'newuser',
      retypePassword: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Missing password.');
  });

  it('should throw an exception when the request is missing the retypePassword field', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.createUser.resolves(mockUser);
    userRepositoryMock.getUserByUsername.resolves(null);

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
    };
    
    await expect(authService.register(requestData)).to.be.rejectedWith('Missing retyped password.');
  });

  it('should throw an exception when the request has mismatched password and retypePassword fields', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
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
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
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
