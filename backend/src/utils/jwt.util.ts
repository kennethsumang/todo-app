import { injectable } from "inversify";
import path from "path";
import * as fs from 'node:fs';
import * as jose from "jose";
import jwtConfig from "../config/jwt.config";
import { CustomJwtPayload } from "../types/auth";

const rootDirectory = process.cwd();

@injectable()
export default class JwtUtil {
  async create(data: Record<string, any>): Promise<string> {
    const filePath = path.join(rootDirectory, "privateKey.pem");
    const privateKey = fs.readFileSync(filePath, "utf-8").trim();
    const key = await jose.importPKCS8(privateKey, 'RS256');
    return new jose.SignJWT(data)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime(jwtConfig.expiry)
      .setIssuer(jwtConfig.issuer)
      .setAudience(jwtConfig.audience)
      .sign(key);
  }

  async verify(token: string): Promise<Object> {
    const filePath = path.join(rootDirectory, "publicKey.pem");
    const publicKey = fs.readFileSync(filePath, "utf-8");
    const key = await jose.importSPKI(publicKey, 'RS256');
    const { payload } = await jose.jwtVerify(token, key, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
    return payload as unknown as CustomJwtPayload;
  }
}