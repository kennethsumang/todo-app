import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export default class TodoRepository {
  constructor(@inject(PrismaClient) private readonly prisma: PrismaClient) {}
}