import { PrismaClient, RefreshToken } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { addToCurrentDate, getUtcDate } from '../utils/date.util';
import config from '../config/auth.config';

export interface RefreshTokenRepositoryInterface {}

/**
 * RefreshTokenRepository class
 */
@injectable()
export default class RefreshTokenRepository {
  constructor(@inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async create(token: string, userId: string): Promise<RefreshToken> {
    return await this.prisma
      .refreshToken
      .create({
        data: {
          token: token,
          createdAt: getUtcDate(),
          expiresAt: addToCurrentDate(config.refreshTokenExpiryInDays),
          user: { connect: { id: userId } },
        },
      });
  }

  async getTokensByUserId(userId: string): Promise<RefreshToken[]> {
    console.log('Date: ', getUtcDate());
    return await this.prisma
      .refreshToken
      .findMany({
        where: {
          userId: userId,
          expiresAt: {
            gte: getUtcDate()
          }
        }
      });
  }
}