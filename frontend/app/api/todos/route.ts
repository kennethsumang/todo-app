import {getSessionFromServer} from "@/app/_libs/session";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSessionFromServer();
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  console.log(`Session: ${JSON.stringify(session)}`);
  if (!session || !session.accessToken) {
    return Response.json({
      error: {
        code: 401,
        message: 'Invalid session.',
      }
    }, { status: 401 });
  }

  const url = new URL(process.env.NEXT_PUBLIC_API_URL ?? "");
  url.searchParams.append("page", page ?? "1");
  url.searchParams.append("limit", limit ?? "10");
  url.searchParams.append("userId", session.user!.id);
  let response: Response;
  response = await fetch(
    url.toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`,
      },
    }
  );

  if (response.ok) {
    return new Response(
      await response.json(),
      { status: 200 },
    );
  }

  if (response.status === 401) {
    // attempt to refresh token
    const refreshTokenUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/refresh-token`;
    await fetch(refreshTokenUrl, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: session.refreshToken!,
        userId: session.user!.id,
      })
    });
    // then fetch again resource
    response = await fetch(
      url.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response.ok) {
      return new Response(
        await response.json(),
        { status: 200 },
      );
    }
  }

  if (!response.ok) {
    // just carry over the api error
    return Response.json(
      await response.json(),
      { status: response.status, statusText: response.statusText }
    );
  }


}