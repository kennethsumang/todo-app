import { PrismaClient, User } from '@prisma/client';
import { inject, injectable } from 'inversify';
import RegisterDto from '../dtos/auth/register.dto';
import { getUtcDate } from '../utils/date.util';

export interface UserRepositoryInterface {
  createUser: (data: Omit<RegisterDto, 'retypePassword'>) => Promise<Omit<User, 'password'>|null>;
  getUserByUsername: (username: string) => Promise<Omit<User, 'password'>|null>;
}

/**
 * UserRepository class
 */
@injectable()
export default class UserRepository implements UserRepositoryInterface{
  constructor(@inject(PrismaClient) private prisma: PrismaClient) {}

  async createUser(data: Omit<RegisterDto, 'retypePassword'>): Promise<Omit<User, 'password'>|null> {
    return this.prisma
      .user
      .create({
        data: {
          ...data,
          createdAt: getUtcDate(),
        }
      })
  }

  async getUserByUsername(username: string): Promise<Omit<User, 'password'>|null> {
    return await this.prisma
      .user
      .findFirst({ where: { username } });
  }
}