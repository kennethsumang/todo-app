import { getSessionFromServer } from "@/app/_libs/session";
import requestLogout from "@/app/_requests/auth/logout.request";
import { ApiError } from "next/dist/server/api-utils";

export async function POST() {
  const session = await getSessionFromServer();
  const userId = session.user?.id;
  const refreshToken = session.refreshToken;

  if (!userId || !refreshToken) {
    return Response.json(
      {
        error: {
          code: 400,
          message: "Session not found,.",
        },
      },
      { status: 400, statusText: "Session not found." }
    );
  }

  try {
    const response = await requestLogout({
      userId,
      refreshToken,
    });
    session.destroy();
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
