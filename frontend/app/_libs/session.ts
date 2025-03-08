import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AuthUserState } from "../_types/auth";
import {NextRequest, NextResponse} from "next/server";

export interface SessionData {
  user?: AuthUserState;
  refreshToken?: string;
  accessToken?: string;
}

export const defaultSession: SessionData = {
  user: undefined,
  refreshToken: undefined,
  accessToken: undefined,
};

export const sessionOptions: SessionOptions = {
  password: process.env.COOKIE_PASSWORD ?? "",
  cookieName: process.env.COOKIE_NAME ?? "",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSessionFromServer() {
  return await getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function getSessionFromApiRoute(req: NextRequest) {
  return await getIronSession<SessionData>(req, new NextResponse, sessionOptions);
}