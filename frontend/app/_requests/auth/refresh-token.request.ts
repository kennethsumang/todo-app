import BaseRequest, { RequestOptions } from "../base.request";

interface LoginResponse {
  accessToken: string;
}

export class RefreshTokenRequest extends BaseRequest<
  RequestOptions,
  LoginResponse
> {
  url = "/api/auth/refresh-token";
  method = "POST";
}

export default async function requestTokenRefresh() {
  return await new RefreshTokenRequest().request({});
}
