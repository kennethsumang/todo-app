import { getSessionFromServer, SessionData } from "@/app/_libs/session";

export async function POST() {
  console.log("Executing POST /api/auth/refresh-token.");
  const session = await getSessionFromServer();

  if (!session.refreshToken || !session.user?.id) {
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

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`
  );
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: session.refreshToken!,
      userId: session.user!.id,
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

  const responseData = responseJson.data as SessionData;
  session.user = responseData.user;
  session.refreshToken = responseData.refreshToken;
  session.accessToken = responseData.accessToken;
  await session.save();
  return Response.json(response, { status: 200 });
}
