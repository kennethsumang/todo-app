export interface CustomJwtPayload {
  id: number;
  username: string;
  createdAt: Date|string|number;
  updatedAt: Date|string|number|null;
}