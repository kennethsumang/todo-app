import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { inject, injectable } from 'inversify';
import _ from 'lodash';

/**
 * AuthController cla
 */
@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    return await this.authService.login(req.body)
  }

  async register(req: Request, res: Response) {
    return this.authService.register(req.body);
  }

  async logout(req: Request, res: Response) {
    return await this.authService.logout(req.body.refreshToken, req.body.userId);
  }

  async refreshToken(req: Request, res: Response) {
    return this.authService.refreshToken(req.body.refreshToken, req.body.userId);
  }
}