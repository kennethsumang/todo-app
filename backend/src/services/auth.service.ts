import LoginDto from '../dtos/auth/login.dto';
import RegisterDto from '../dtos/auth/register.dto';
import AuthRepository from '../repositories/auth.repository';
import { inject, injectable } from 'inversify';
import UserRepository from '../repositories/user.repository';

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
    throw new Error('Method not implemented yet.');
  }

  async refreshToken() {
    return {};
  }

  async logout() {
    return {};
  }
}