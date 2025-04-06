import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import JwtUtil from '../utils/jwt.util';
import { CustomJwtPayload } from '../types/auth';
import UnauthorizedError from "../exceptions/unauthorized.error";
import { AUTH_ERROR_CODES } from '../constants/error.constant';

dayjs.extend(utc);

const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Executing endpoint: ${req.url}`);
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return next(new UnauthorizedError('No token provided', AUTH_ERROR_CODES.MISSING_ACCESS_TOKEN));
    }
  
    const bearerToken = authToken.split(' ');
    if (bearerToken.length < 2 || bearerToken[0] !== 'Bearer') {
      return next(new UnauthorizedError('Invalid bearer token.', AUTH_ERROR_CODES.INVALID_BEARER_TOKEN));
    }
  
    const token = bearerToken[1];
    req.user = await (new JwtUtil).verify(token) as CustomJwtPayload;
    next();
  } catch (e) {
    return next(new UnauthorizedError('Invalid bearer token.', AUTH_ERROR_CODES.INVALID_BEARER_TOKEN));
  }
};

export default tokenMiddleware;