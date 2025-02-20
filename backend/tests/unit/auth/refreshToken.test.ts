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
import { addToCurrentDate, getUtcDate } from '../../../src/utils/date.util';
import { RefreshToken } from '@prisma/client';

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
    const currentRefreshToken = 'currentrefreshtoken';
    const userId = 'newuser';
    const refreshTokenList = [
      { id: 'uuid1', token: 'hashedcurrentrefreshtoken', userId: 'newuser', expiresAt: addToCurrentDate(30), createdAt: getUtcDate() }
    ];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('currentrefreshtoken', 'hashedcurrentrefreshtoken').resolves(true);
    jwtUtilMock.create.resolves('newaccesstoken');

    const response = await authService.refreshToken(currentRefreshToken, userId);
    expect(response).to.deep.equal({ accessToken: 'newaccesstoken' });
  });

  it('should throw an exception when refresh token is missing in request', async () => {
    const userId = 'newuser';
    const refreshTokenList = [
      { id: 'uuid1', token: 'hashedcurrentrefreshtoken', userId: 'newuser', expiresAt: addToCurrentDate(30), createdAt: getUtcDate() }
    ];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('currentrefreshtoken', 'hashedcurrentrefreshtoken').resolves(true);
    jwtUtilMock.create.resolves('newaccesstoken');

    await expect(authService.refreshToken(undefined, userId)).to.be.rejectedWith('Missing refresh token.');
  });

  it('should throw an exception when userId is missing in request', async () => {
    const currentRefreshToken = 'currentrefreshtoken';
    const refreshTokenList = [
      { id: 'uuid1', token: 'hashedcurrentrefreshtoken', userId: 'newuser', expiresAt: addToCurrentDate(30), createdAt: getUtcDate() }
    ];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('currentrefreshtoken', 'hashedcurrentrefreshtoken').resolves(true);
    jwtUtilMock.create.resolves('newaccesstoken');

    await expect(authService.refreshToken(currentRefreshToken, undefined)).to.be.rejectedWith('Missing userId.');
  });

  it('should throw an error when refresh token is not found in DB', async () => {
    const currentRefreshToken = 'currentrefreshtoken';
    const userId = 'newuser';
    const refreshTokenList = [] as RefreshToken[];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('currentrefreshtoken', 'hashedcurrentrefreshtoken').resolves(true);
    jwtUtilMock.create.resolves('newaccesstoken');

    await expect(authService.refreshToken(currentRefreshToken, userId)).to.be.rejectedWith('Invalid refresh token.');
  });

  it('should throw an error when user is not found in DB', async () => {
    const currentRefreshToken = 'currentrefreshtoken';
    const userId = 'newuser';
    const refreshTokenList = [] as RefreshToken[];
    const mockUser = null;
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('currentrefreshtoken', 'hashedcurrentrefreshtoken').resolves(true);
    jwtUtilMock.create.resolves('newaccesstoken');

    await expect(authService.refreshToken(currentRefreshToken, userId)).to.be.rejectedWith('User not found.');
  });
});