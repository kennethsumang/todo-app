import { CustomJwtPayload } from './auth';

declare module "express-serve-static-core" {
  interface Request {
    user?: CustomJwtPayload;
  }
}
