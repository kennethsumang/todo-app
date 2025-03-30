import { test, expect } from "@playwright/test";

test("login page is visible when there is no cookies set", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/");

  await expect(page.getByRole("textbox", { name: "User Name" })).toBeEditable();
  await expect(page.getByRole("textbox", { name: "Password" })).toBeEditable();
  await expect(
    page.getByRole("button", { name: "Sign in", exact: true })
  ).toBeVisible();
});

test("clicking sign in without entering credentials should not continue to todos page and displays error", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/");

  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(
    page.getByRole("button", { name: "Sign in", exact: true })
  ).toBeVisible();

  await expect(page.getByText("Username is required.")).toBeVisible();
  await expect(page.getByText("Password is required.")).toBeVisible();
});

test("clicking sign in without entering password should not continue to todos page and displays error", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(
    page.getByRole("button", { name: "Sign in", exact: true })
  ).toBeVisible();

  await expect(page.getByText("Password is required.")).toBeVisible();
});

test("clicking sign in without entering username should not continue to todos page and displays error", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/");

  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(
    page.getByRole("button", { name: "Sign in", exact: true })
  ).toBeVisible();

  await expect(page.getByText("Username is required.")).toBeVisible();
});

test("logging in with correct credentials should redirect to todos page", async ({
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
});
