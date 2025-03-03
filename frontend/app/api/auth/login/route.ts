import { getSessionFromServer } from "@/app/_libs/session";
import requestLogin from "@/app/_requests/auth/login.request";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(request: Request) {
  const session = await getSessionFromServer();
  const body = await request.json();

  if (!body.username || !body.password) {
    return Response.json(
      {
        error: {
          code: 400,
          message: "Invalid or missing credentials.",
        },
      },
      { status: 400, statusText: "Invalid or missing credentials." }
    );
  }

  try {
    const response = await requestLogin({
      username: body.username,
      password: body.password,
    });
    session.user = response.user;
    session.refreshToken = response.refreshToken;
    session.accessToken = response.accessToken;
    await session.save();
    return Response.json(response, { status: 200 });
  } catch (e) {
    if (e instanceof ApiError) {
      return Response.json(
        {
          error: {
            code: e.statusCode,
            message: e.message,
          },
        },
        { status: e.statusCode, statusText: e.message }
      );
    }

    return Response.json(
      {
        error: {
          code: 500,
          message: (e as Error).message,
        },
      },
      { status: 500, statusText: (e as Error).message }
    );
  }
}
