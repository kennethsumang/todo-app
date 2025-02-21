import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import BadRequestError from '../exceptions/badRequest.error';
import JwtUtil from '../utils/jwt.util';
import { CustomJwtPayload } from '../types/auth';

dayjs.extend(utc);

const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new BadRequestError('No token provided');
    }
  
    const bearerToken = authToken.split(' ');
    if (bearerToken.length < 2 || bearerToken[0] !== 'Bearer') {
      throw new BadRequestError('Invalid bearer token.');
    }
  
    const token = bearerToken[1];
    req.user = await (new JwtUtil).verify(token) as CustomJwtPayload;
    next();
  } catch (e) {
    throw new BadRequestError('Invalid bearer token.');
  }
};

export default tokenMiddleware;