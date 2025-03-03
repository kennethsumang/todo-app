import { AuthUserState } from "../../_types/auth";
import BaseRequest, { RequestOptions } from "../base.request";

export interface LogoutPayload {
  refreshToken: string;
  userId: string;
}

interface LogoutRequestOptions extends RequestOptions {
  body: LogoutPayload;
}

export interface LogoutResponse {
  result: boolean;
}

export class LoginRequest extends BaseRequest<
  LogoutRequestOptions,
  LogoutResponse
> {
  url = "/api/auth/logout";
  method = "POST";
}

export default async function requestLogout(payload: LogoutPayload) {
  return await new LoginRequest().request({
    body: payload,
  });
}
