export interface CustomJwtPayload {
  id: string;
  username: string;
  createdAt: Date|string|number;
  updatedAt: Date|string|number|null;
}