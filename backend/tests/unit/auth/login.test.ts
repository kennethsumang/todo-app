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

describe('AuthService.login', () => {
  let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
  let refreshTokenRepositoryMock: sinon.SinonStubbedInstance<RefreshTokenRepository>;
  let jwtUtilMock: sinon.SinonStubbedInstance<JwtUtil>;
  let hashUtilMock: sinon.SinonStubbedInstance<HashUtil>;
  let stringUtilMock: sinon.SinonStubbedInstance<StringUtil>;
  let authService: AuthService;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    refreshTokenRepositoryMock = sinon.createStubInstance(RefreshTokenRepository);
    jwtUtilMock = sinon.createStubInstance(JwtUtil);
    hashUtilMock = sinon.createStubInstance(HashUtil);
    stringUtilMock = sinon.createStubInstance(StringUtil);

    // Inject the mock into the service
    authService = new AuthService(refreshTokenRepositoryMock, userRepositoryMock, jwtUtilMock, hashUtilMock, stringUtilMock);
  });

  it('should return user data and token when login is successful', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')
    hashUtilMock.compare.resolves(true);
    hashUtilMock.hash.resolves('hashedrefreshtoken');
    stringUtilMock.getRandomString.resolves('refreshtoken');

    const requestData = {
      username: 'newuser',
      password: 'newpassword',
    };

    const response = await authService.login(requestData);
    expect(response).to.deep.equal({
      user: _.omit(mockUser, 'password'),
      accessToken: 'token',
      refreshToken: 'refreshtoken',
    });
  });

  it('should throw an error when password does not match the record', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token');
    hashUtilMock.compare.resolves(false);

    const requestData = {
      username: 'newuser',
      password: 'notmypassword',
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('Credentials do not match.');
  });

  it('should throw an error when username is not defined in request', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')
    hashUtilMock.compare.resolves(true);

    const requestData = {
      password: 'newpassword',
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('Missing username.');
  });

  it('should throw an error when password is not defined in request', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')
    hashUtilMock.compare.resolves(true);

    const requestData = {
      username: 'newuser',
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('Missing password.');
  });

  it('should throw an error when username and password is not defined in request', async () => {
    const mockUser = { id: 'id', username: 'newuser', password: 'newpassword', createdAt: new Date(), updatedAt: null };
    userRepositoryMock.getUserByUsername.resolves(mockUser);
    jwtUtilMock.create.resolves('token')
    hashUtilMock.compare.resolves(true);

    const requestData = {};

    await expect(authService.login(requestData)).to.be.rejectedWith('Missing username. Missing password.');
  });

  it('should throw an error when user does not exist', async () => {
    userRepositoryMock.getUserByUsername.resolves(null);
    jwtUtilMock.create.resolves('token')
    hashUtilMock.compare.resolves(true);

    const requestData = {
      username: 'newuser',
      password: 'newpassword'
    };

    await expect(authService.login(requestData)).to.be.rejectedWith('User does not exist.');
  });
});
