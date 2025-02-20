import LoginDto from '../dtos/auth/login.dto';
import RegisterDto from '../dtos/auth/register.dto';
import RefreshTokenRepository from '../repositories/refreshToken.repository';
import { inject, injectable } from 'inversify';
import UserRepository from '../repositories/user.repository';
import RegisterValidator from '../validators/auth/register.validator';
import BadRequestError from '../exceptions/badRequest.error';
import ServerError from '../exceptions/server.error';
import _ from 'lodash';
import JwtUtil from '../utils/jwt.util';
import LoginValidator from '../validators/auth/login.validator';
import HashUtil from '../utils/hash.util';
import { randomBytes } from 'crypto';

interface UserDataInterface {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date|null;
}

interface LoginResponse {
  user: UserDataInterface;
  accessToken: string;
  refreshToken: string;
}

/**
 * AuthService class
 */
@injectable()
export default class AuthService {
  constructor(
    @inject(RefreshTokenRepository) private readonly refreshTokenRepository: RefreshTokenRepository,
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(JwtUtil) private readonly jwt: JwtUtil,
    @inject(HashUtil) private readonly hash: HashUtil,
  ) {}

  async login(data: Record<string, any>): Promise<LoginResponse> {
    const validated = (new LoginValidator).validate<LoginDto>(data);

    // check if user exists
    const user = await this.userRepository.getUserByUsername(validated.username);
    if (!user) {
      throw new BadRequestError('User does not exist.');
    }

    const comparedPassword = await this.hash.compare(validated.password, user.password);
    if (!comparedPassword) {
      throw new BadRequestError('Credentials do not match.');
    }

    const tokenUserData = _.omit(user, 'password');
    const token = await this.jwt.create(tokenUserData);
    const refreshToken = randomBytes(64).toString('hex');

    // save refresh token hashed in DB
    const hashedRefreshToken = await this.hash.hash(refreshToken);
    await this.refreshTokenRepository.create(hashedRefreshToken, user.id);

    return {
      user: tokenUserData,
      accessToken: token,
      refreshToken: refreshToken,
    };
  }

  async register(data: Record<string, any>): Promise<UserDataInterface> {
    const validated = (new RegisterValidator).validate<RegisterDto>(data);

    // check if username exists
    const sameUsername = await this.userRepository.getUserByUsername(validated.username);
    if (sameUsername) {
      throw new BadRequestError('User with that username already exists.');
    }

    const formData = _.omit(validated, 'retypePassword');
    formData.password = await this.hash.hash(formData.password);
    const newUser = await this.userRepository.createUser(formData);
    if (!newUser) {
      throw new ServerError('User saving failed.');
    }

    return newUser;
  }

  async refreshToken() {
    return {};
  }

  async logout() {
    return {};
  }
}