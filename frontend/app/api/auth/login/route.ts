import { getSessionFromServer, SessionData } from "@/app/_libs/session";

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

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`);
  const response = await fetch(url.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return Response.json(
      {
        error: {
          code: response.status,
          message: response.statusText,
        },
      },
      { status: response.status, statusText: response.statusText }
    );
  }

  const responseJson = await response.json();
  const responseData = responseJson.data as SessionData;
  session.user = responseData.user;
  session.refreshToken = responseData.refreshToken;
  session.accessToken = responseData.accessToken;
  await session.save();
  return Response.json(responseJson, { status: 200 });
}
