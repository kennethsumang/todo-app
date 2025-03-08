import BaseRequest, { RequestOptions } from "../base.request";


export interface LogoutResponse {
  success: boolean;
}

export class LogoutRequest extends BaseRequest<
  RequestOptions,
  LogoutResponse
> {
  url = "/api/auth/logout";
  method = "POST";
}

export default async function requestLogout() {
  return await new LogoutRequest().request({});
}
