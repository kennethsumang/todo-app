import { test, expect } from "@playwright/test";

test("logging out must redirect to login page", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await responsePromise;

  await expect(page.getByText("To-do")).toBeVisible();
  await expect(page.getByText("admin", { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'signout Sign out' })).toBeVisible();

  const logoutResponsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/logout")
  );
  await page.getByRole('button', { name: 'signout Sign out' }).click();
  await logoutResponsePromise;

  await expect(page).toHaveURL("http://localhost:5173");
});