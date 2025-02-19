import { injectable } from "inversify";

@injectable()
export default class JwtUtil {
  async create(data: Record<string, any>): Promise<string> {
    return '';
  }
}