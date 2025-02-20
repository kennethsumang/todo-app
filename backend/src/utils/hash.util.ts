import { injectable } from "inversify";
import { hash, verify } from "argon2";

@injectable()
export default class HashUtil {
  async hash(str: string): Promise<string> {
    return await hash(str);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await verify(hashed, plain);
  }
}
