import { AuthUserState } from "../../types/auth";
import BaseRequest, { RequestOptions } from "../base.request";

export interface RegisterPayload {
  username: string;
  password: string;
  retypePassword: string;
}

interface RegisterRequestOptions extends RequestOptions {
  body: RegisterPayload;
}

interface LoginResponse {
  accessToken: string;
  // refreshToken: string;
  user: AuthUserState;
}

export class RegisterRequest extends BaseRequest<
  RegisterRequestOptions,
  LoginResponse
> {
  url = "/api/auth/register";
  method = "POST";
}

export default async function requestLogin(credentials: RegisterPayload) {
  return await new RegisterRequest().request({
    body: credentials,
  });
}
