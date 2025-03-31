import { test, expect } from "@playwright/test";

test("directly going to dashboard without logging in will redirect to login page", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/todos");
  await expect(page).toHaveURL("http://localhost:5173");
});

test("successfully logging in and going to login page will redirect to dashboard page", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await responsePromise;

  await page.goto("/");
  await expect(page).toHaveURL("http://localhost:5173/todos");
});

test("successfully logging in and opening a new window to login page will redirect to dashboard page", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await responsePromise;

  const newPage = await context.newPage();
  await newPage.goto("/");
  await expect(newPage).toHaveURL("http://localhost:5173/todos");
});