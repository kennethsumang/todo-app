import { getSessionFromServer, SessionData } from "@/app/_libs/session";

export async function POST(request: Request) {
  const session = await getSessionFromServer();
  const body = await request.json();

  if (!body.username || !body.password || !body.retypePassword) {
    return Response.json(
      {
        error: {
          code: 400,
          message: "Invalid register data.",
        },
      },
      { status: 400, statusText: "Invalid register data." }
    );
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`);
  const response = await fetch(url.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
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

  return Response.json(responseJson, { status: 200 });
}
