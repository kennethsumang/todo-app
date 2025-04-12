import { test, expect } from "@playwright/test";

test.describe("Near due highlight tests", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");

    await page.getByRole("textbox", { name: "User Name" }).fill("admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

    const responsePromise = page.waitForResponse((resp) =>
      resp.url().includes("/api/auth/login")
    );
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await responsePromise;
  });

  test("High priority items that have due date in 24 hours must have highlight in table view", async ({ page }) => {});
  test("Critical priority items that have due date in 48 hours must have highlight in table view", async ({ page }) => {});
  test("Low priority near due date must have no highlight", async ({ page }) => {});
  test("High priority with due date more than 24 hours must have no highlight", async ({ page }) => {});
  test("Critical priority with due date more than 48 hours must have no highlight", async ({ page }) => {});
});