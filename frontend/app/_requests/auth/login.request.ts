import { AuthUserState } from "../../_types/auth";
import BaseRequest, { RequestOptions } from "../base.request";

export interface LoginPayload {
  username: string;
  password: string;
}

interface LoginRequestOptions extends RequestOptions {
  body: LoginPayload;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUserState;
}

export class LoginRequest extends BaseRequest<
  LoginRequestOptions,
  LoginResponse
> {
  url = "/api/auth/login";
  method = "POST";
}

export default async function requestLogin(credentials: LoginPayload) {
  return await new LoginRequest().request({
    body: credentials,
  });
}
