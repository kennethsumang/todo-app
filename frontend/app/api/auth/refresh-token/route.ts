import { getSessionFromServer } from "@/app/_libs/session";
import requestTokenRefresh from "@/app/_requests/auth/refresh-token.request";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(request: Request) {
  const session = await getSessionFromServer();
  const body = await request.json();

  if (!body.refreshToken || !body.userId) {
    return Response.json(
      {
        error: {
          code: 400,
          message: "Invalid request.",
        },
      },
      { status: 400, statusText: "Invalid request." }
    );
  }

  try {
    const response = await requestTokenRefresh({
      userId: body.userId,
      refreshToken: body.refreshToken,
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
