import { injectable } from "inversify";

@injectable()
export default class HashUtil {
  async hash(str: string): Promise<string> {
    return '';
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return true;
  }
}
