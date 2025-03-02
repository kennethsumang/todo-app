import "server-only";
import { cookies } from "next/headers";

export async function saveCookie(key: string, name: string) {
  const cookieStore = await cookies();

  cookieStore.set(key, name, {
    httpOnly: true,
    sameSite: "lax",
  });
}
