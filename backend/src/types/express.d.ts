import { Request } from 'express';
import { CustomJwtPayload } from './auth';

declare module "express" {
  interface Request {
    user?: CustomJwtPayload;
  }
}
