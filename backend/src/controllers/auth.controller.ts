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
    return await this.authService.login(req.body);
    // Set refresh token as an HTTP-only cookie
    // res.clearCookie('refreshToken');
    // res.clearCookie('userId');
    // res.cookie('refreshToken', response.refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    // });
    // res.cookie('userId', response.user.id, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    // });
    // console.log(`Refresh Token: ${response.refreshToken}`);
    // console.log(`User ID: ${response.user.id}`);
    // return _.omit(response, 'refreshToken');
  }

  async register(req: Request, res: Response) {
    return this.authService.register(req.body);
  }

  async logout(req: Request, res: Response) {
    // for development
    // const refreshToken = process.env.NODE_ENV !== 'production'
    //   ? req.body.refreshToken || req.cookies.refreshToken
    //   : req.cookies.refreshToken;
    return await this.authService.logout(req.body.refreshToken, req.body.userId);
    // // Clear cookie
    // res.clearCookie('refreshToken', {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   path: '/',
    //   sameSite: 'lax',
    // });
    // return response;
  }

  async refreshToken(req: Request, res: Response) {
    // for development
    // const refreshToken = process.env.NODE_ENV !== 'production'
    //   ? req.body.refreshToken || req.cookies.refreshToken
    //   : req.cookies.refreshToken;
    // const userId = process.env.NODE_ENV !== 'production'
    //   ? req.body.userId || req.cookies.userId
    //   : req.cookies.userId;
    // console.log('AuthController.refreshToken');
    // console.log(`Refresh Token: ${refreshToken}`);
    // console.log(`User ID: ${userId}`);
    return this.authService.refreshToken(req.body.refreshToken, req.body.userId);
  }
}