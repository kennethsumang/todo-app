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

describe('AuthService.logout', () => {
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

  it('should return true if the request is valid', async () => {
    const refreshToken = 'refreshtoken';
    const userId = 'newuser';
    const refreshTokenList = [
      { id: 'uuid1', token: 'hashedrefreshtoken', userId: 'newuser', expiresAt: addToCurrentDate(30), createdAt: getUtcDate() }
    ];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('refreshtoken', 'hashedrefreshtoken').resolves(true);
    refreshTokenRepositoryMock.deleteRefreshToken.resolves(refreshTokenList[0]);

    const response = await authService.logout(refreshToken, userId);
    expect(response).to.deep.equal({ result: true });
  });

  it('should throw an exception when refresh token does not exist in request', async () => {
    const userId = 'newuser';
    const refreshTokenList = [
      { id: 'uuid1', token: 'hashedrefreshtoken', userId: 'newuser', expiresAt: addToCurrentDate(30), createdAt: getUtcDate() }
    ];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('refreshtoken', 'hashedrefreshtoken').resolves(true);
    refreshTokenRepositoryMock.deleteRefreshToken.resolves(refreshTokenList[0]);

    await expect(authService.refreshToken(undefined, userId)).to.be.rejectedWith('Missing refresh token.');
  });

  it('should throw an exception when userId does not exist in request', async () => {
    const refreshToken = 'refreshtoken';
    const refreshTokenList = [
      { id: 'uuid1', token: 'hashedrefreshtoken', userId: 'newuser', expiresAt: addToCurrentDate(30), createdAt: getUtcDate() }
    ];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('refreshtoken', 'hashedrefreshtoken').resolves(true);
    refreshTokenRepositoryMock.deleteRefreshToken.resolves(refreshTokenList[0]);

    await expect(authService.refreshToken(refreshToken, undefined)).to.be.rejectedWith('Missing userId.');
  });

  it('should throw an exception when the user does not exist', async () => {
    const refreshToken = 'refreshtoken';
    const userId = 'newuser';
    const refreshTokenList = [] as RefreshToken[];
    const mockUser = null;

    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('refreshtoken', 'hashedrefreshtoken').resolves(true);
    refreshTokenRepositoryMock.deleteRefreshToken.resolves(refreshTokenList[0]);

    await expect(authService.refreshToken(refreshToken, userId)).to.be.rejectedWith('User not found.');
  });

  it('should throw an exception when the token does not exist in DB', async () => {
    const currentRefreshToken = 'currentrefreshtoken';
    const userId = 'newuser';
    const refreshTokenList = [] as RefreshToken[];
    const mockUser = { id: 'id', username: 'newuser', createdAt: new Date(), updatedAt: null };
    
    userRepositoryMock.getUserById.resolves(mockUser);
    refreshTokenRepositoryMock.getTokensByUserId.resolves(refreshTokenList);
    hashUtilMock.compare.withArgs('refreshtoken', 'hashedrefreshtoken').resolves(true);
    refreshTokenRepositoryMock.deleteRefreshToken.resolves(refreshTokenList[0]);

    await expect(authService.refreshToken(currentRefreshToken, userId)).to.be.rejectedWith('Invalid refresh token.');
  });
});