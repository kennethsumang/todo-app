import { test, expect } from "@playwright/test";

test("accessing invalid todo id in view page will redirect to dashboard", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await responsePromise;

  await page.goto("http://localhost:5173/todos/abc");
  await expect(page).toHaveURL("http://localhost:5173");
});