import { test, expect } from "@playwright/test";

test.describe("Multiple Todo Delete", () => {
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

  test("trash icon must be disabled when no checkbox is checked", async ({ page }) => {

  });

  test("selecting 1 item and deleting must have confirmation that 1 item will be deleted", async ({ page }) => {

  });

  test("selecting 3 items and deleting must have confirmation that 1 item will be deleted", async ({ page }) => {

  });

  test("cancelling confirmation must not delete any items", async ({ page }) => {

  });

  test("confirming deletion of 1 item must delete the selected item", async ({ page }) => {

  });
});