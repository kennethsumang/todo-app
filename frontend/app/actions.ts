"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  // Set cookie
  cookieStore.set(name, value);
}
