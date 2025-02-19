import LoginDto from '../dtos/auth/login.dto';
import RegisterDto from '../dtos/auth/register.dto';
import AuthRepository from '../repositories/auth.repository';
import { inject, injectable } from 'inversify';
import UserRepository from '../repositories/user.repository';
import RegisterValidator from '../validators/auth/register.validator';
import BadRequestError from '../exceptions/badRequest.error';
import ServerError from '../exceptions/server.error';

interface RegisterResponseInterface {
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
  ) {}

  async login(credentials: LoginDto) {
    return {};
  }

  async register(data: Record<string, any>): Promise<RegisterResponseInterface> {
    const validated = (new RegisterValidator).validate<RegisterDto>(data);

    // check if username exists
    const sameUsername = await this.userRepository.getUserByUsername(validated.username);
    if (sameUsername) {
      throw new BadRequestError('User with that username already exists.');
    }

    const newUser = await this.userRepository.createUser(validated);
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