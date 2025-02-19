import { User } from '@prisma/client';
import { injectable } from 'inversify';
import RegisterDto from '../dtos/auth/register.dto';

export interface UserRepositoryInterface {
  createUser: (data: Omit<RegisterDto, 'retypePassword'>) => Promise<Omit<User, 'password'>|null>;
}

/**
 * UserRepository class
 */
@injectable()
export default class UserRepository implements UserRepositoryInterface{
  async createUser(data: Omit<RegisterDto, 'retypePassword'>): Promise<Omit<User, 'password'>|null> {
    return null;
  }
}