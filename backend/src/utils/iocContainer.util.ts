import { Container } from 'inversify';
import AuthService from '../services/auth.service';
import AuthController from '../controllers/auth.controller';
import AuthRepository from '../repositories/auth.repository';
import UserRepository from '../repositories/user.repository';

const container = new Container();

container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export default container;