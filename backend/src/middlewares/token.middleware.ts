import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import JwtUtil from '../utils/jwt.util';
import { CustomJwtPayload } from '../types/auth';
import UnauthorizedError from "../exceptions/unauthorized.error";

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
      return next(new UnauthorizedError('No token provided'));
    }
  
    const bearerToken = authToken.split(' ');
    if (bearerToken.length < 2 || bearerToken[0] !== 'Bearer') {
      return next(new UnauthorizedError('Invalid bearer token.'));
    }
  
    const token = bearerToken[1];
    req.user = await (new JwtUtil).verify(token) as CustomJwtPayload;
    next();
  } catch (e) {
    return next(new UnauthorizedError('Invalid bearer token.'));
  }
};

export default tokenMiddleware;