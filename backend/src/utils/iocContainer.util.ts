import { Container } from 'inversify';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import RefreshTokenRepository from '../repositories/refreshToken.repository';
import UserRepository from '../repositories/user.repository';
import { PrismaClient } from '@prisma/client';
import JwtUtil from './jwt.util';
import HashUtil from './hash.util';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import StringUtil from './string.util';
import TodoService from '../services/todo.service';
import TodoController from '../controllers/todo.controller';
import TodoRepository from '../repositories/todo.repository';

const container = new Container();

container.bind<PrismaClient>(PrismaClient).toSelf().inSingletonScope();
container.bind<JwtUtil>(JwtUtil).toSelf().inSingletonScope();
container.bind<HashUtil>(HashUtil).toSelf().inSingletonScope();
container.bind<StringUtil>(StringUtil).toSelf().inSingletonScope();

container.bind<RefreshTokenRepository>(RefreshTokenRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<AuthController>(AuthController).toSelf();
container.bind<UserController>(UserController).toSelf();

container.bind<TodoRepository>(TodoRepository).toSelf();
container.bind<TodoService>(TodoService).toSelf();
container.bind<TodoController>(TodoController).toSelf();

export default container;