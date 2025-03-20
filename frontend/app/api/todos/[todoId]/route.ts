import { getSessionFromServer } from "@/app/_libs/session";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ todoId: string }> }
) {
  const session = await getSessionFromServer();
  const { todoId } = await params;

  if (!session || !session.accessToken) {
    return Response.json(
      {
        error: {
          code: 401,
          message: "Invalid session.",
        },
      },
      { status: 401 }
    );
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/todos/${todoId}`
  );
  let response: Response;
  response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.ok) {
    const responseData = await response.json();
    return Response.json(responseData, { status: 200 });
  }

  if (response.status === 401) {
    // attempt to refresh token
    const refreshTokenUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh-token`;
    await fetch(refreshTokenUrl, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: session.refreshToken!,
        userId: session.user!.id,
      }),
      credentials: "include",
      mode: "same-origin",
    });
    // then fetch again resource
    response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response.ok) {
      return Response.json(await response.json(), { status: 200 });
    }
  }
  // just carry over the api error
  return Response.json(await response.json(), {
    status: response.status,
    statusText: response.statusText,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ todoId: string }> }
) {
  const body = await req.json();
  const { todoId } = await params;
  const session = await getSessionFromServer();

  if (!session || !session.accessToken) {
    return Response.json(
      {
        error: {
          code: 401,
          message: "Invalid session.",
        },
      },
      { status: 401 }
    );
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/todos/${todoId}`
  );
  let response: Response;
  response = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const responseData = await response.json();
    return Response.json(responseData, { status: 201 });
  }

  if (response.status === 401) {
    // attempt to refresh token
    const refreshTokenUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh-token`;
    await fetch(refreshTokenUrl, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: session.refreshToken!,
        userId: session.user!.id,
      }),
      credentials: "include",
      mode: "same-origin",
    });
    // then fetch again resource
    response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return Response.json(await response.json(), { status: 201 });
    }
  }
  // just carry over the api error
  return Response.json(await response.json(), {
    status: response.status,
    statusText: response.statusText,
  });
}
