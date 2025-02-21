import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import UserService from '../services/user.service';

/**
 * AuthController class
 */
@injectable()
export default class UserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  async fetchCurrentUserDetails(req: Request, res: Response) {
    return this.userService.fetchCurrentUserDetails(req.user!.id);
  }
}