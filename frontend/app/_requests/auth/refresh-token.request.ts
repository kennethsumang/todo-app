import { AuthUserState } from "@/app/_types/auth";
import BaseRequest, { RequestOptions } from "../base.request";

interface RefreshTokenPayload {
  userId: string;
  refreshToken: string;
}

interface RefreshTokenRequestOptions extends RequestOptions {
  body: RefreshTokenPayload;
}

interface RefreshTokenResponse {
  user: AuthUserState;
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenRequest extends BaseRequest<
  RefreshTokenRequestOptions,
  RefreshTokenResponse
> {
  url = "/api/auth/refresh-token";
  method = "POST";
}

export default async function requestTokenRefresh(
  payload: RefreshTokenPayload
) {
  return await new RefreshTokenRequest().request({ body: payload });
}
