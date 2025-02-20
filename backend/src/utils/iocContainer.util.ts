import { Container } from 'inversify';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import RefreshTokenRepository from '../repositories/refreshToken.repository';
import UserRepository from '../repositories/user.repository';
import { PrismaClient } from '@prisma/client';
import JwtUtil from './jwt.util';
import HashUtil from './hash.util';

const container = new Container();

container.bind<PrismaClient>(PrismaClient).toSelf().inSingletonScope();
container.bind<JwtUtil>(JwtUtil).toSelf().inSingletonScope();
container.bind<HashUtil>(HashUtil).toSelf().inSingletonScope();

container.bind<RefreshTokenRepository>(RefreshTokenRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export default container;