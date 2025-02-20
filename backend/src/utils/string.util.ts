import { injectable } from "inversify";
import { randomBytes } from 'crypto';
import { promisify } from 'util';

const randomBytesAsync = promisify(randomBytes)

@injectable()
export default class StringUtil {
  async getRandomString(numOfChars: number): Promise<string> {
    const randomBytesBuffer = await randomBytesAsync(numOfChars)
    return randomBytesBuffer.toString('hex');
  }
}