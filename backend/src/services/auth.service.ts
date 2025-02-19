import LoginDto from '../dtos/auth/login.dto';
import RegisterDto from '../dtos/auth/register.dto';
import AuthRepository from '../repositories/auth.repository';
import { inject, injectable } from 'inversify';
import UserRepository from '../repositories/user.repository';
import RegisterValidator from '../validators/auth/register.validator';
import BadRequestError from '../exceptions/badRequest.error';
import ServerError from '../exceptions/server.error';
import _ from 'lodash';
import JwtUtil from '../utils/jwt.util';

interface UserDataInterface {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date|null;
}

/**
 * AuthService class
 */
@injectable()
export default class AuthService {
  constructor(
    @inject(AuthRepository) private authRepository: AuthRepository,
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(JwtUtil) private jwt: JwtUtil,
  ) {}

  async login(data: Record<string, any>): Promise<{ user: UserDataInterface, accessToken: string}> {
    throw new Error('Method not implemented.');
  }

  async register(data: Record<string, any>): Promise<UserDataInterface> {
    const validated = (new RegisterValidator).validate<RegisterDto>(data);

    // check if username exists
    const sameUsername = await this.userRepository.getUserByUsername(validated.username);
    if (sameUsername) {
      throw new BadRequestError('User with that username already exists.');
    }

    const formData = _.omit(validated, 'retypePassword');
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