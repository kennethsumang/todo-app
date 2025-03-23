import {
  getSessionFromApiRoute,
  getSessionFromServer,
} from "@/app/_libs/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("Executing GET /api/todos.");
  const session = await getSessionFromApiRoute(req, res);
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const status = req.nextUrl.searchParams.get("status");
  const priority = req.nextUrl.searchParams.get("priority");

  console.log(`Status: ${status}`);
  console.log(`Priority: ${priority}`);

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

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/todos`);
  url.searchParams.append("page", page ?? "1");
  url.searchParams.append("limit", limit ?? "10");
  url.searchParams.append("userId", session.user!.id);

  if (status !== null) {
    url.searchParams.append("status", status);
  }

  if (priority !== null) {
    url.searchParams.append("priority", priority);
  }

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

export async function POST(req: NextRequest) {
  const body = await req.json();
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

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/todos`);
  let response: Response;
  response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
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
      method: "POST",
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
