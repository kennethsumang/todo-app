import { getSessionFromServer } from "@/app/_libs/session";

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
          session: session,
        },
      },
      { status: 400, statusText: "Session not found." }
    );
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
      userId: userId,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    return Response.json(
      {
        error: {
          code: response.status,
          message: responseJson?.error?.message || response.statusText,
        },
      },
      { status: response.status, statusText: response.statusText }
    );
  }

  session.destroy();
  return Response.json({ success: true }, { status: 200 });
}
