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

describe('AuthService.refreshToken', () => {
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

  it('should output new access token when all inputs are valid and refresh token exists in DB', async () => {

  });

  it('should throw an exception when refresh token is missing in request', async () => {

  });

  it('should throw an exception when userId is missing in request', async () => {

  });

  it('should throw an error when refresh token is not found in DB', async () => {

  });

  it('should throw an error when user is not found in DB', async () => {

  });
});