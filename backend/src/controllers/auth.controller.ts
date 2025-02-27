import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { inject, injectable } from 'inversify';
import _ from 'lodash';

/**
 * AuthController class
 */
@injectable()
export default class AuthController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    const response = await this.authService.login(req.body);
     // Set refresh token as an HTTP-only cookie
    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'none',
    });
    return _.omit(response, 'refreshToken');
  }

  async register(req: Request, res: Response) {
    return this.authService.register(req.body);
  }

  async logout(req: Request, res: Response) {
    // for development
    const refreshToken = process.env.NODE_ENV !== 'production'
      ? req.body.refreshToken || req.cookies.refreshToken
      : req.cookies.refreshToken;
    const response = await this.authService.logout(refreshToken, req.body.userId);
    // Clear cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'none',
    });
    return response;
  }

  async refreshToken(req: Request, res: Response) {
    // for development
    const refreshToken = process.env.NODE_ENV !== 'production'
      ? req.body.refreshToken || req.cookies.refreshToken
      : req.cookies.refreshToken;
    return this.authService.refreshToken(refreshToken, req.body.userId);
  }
}