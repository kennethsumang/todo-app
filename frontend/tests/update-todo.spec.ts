import { test, expect } from "@playwright/test";

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

test.describe("update todo", () => {
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

  test("removing title and detail inputs and saving will show an error on title and details", async ({ page }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page.getByRole('row', { name: `${id}-edit-button` }).getByRole('button');
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await page.getByRole('textbox', { name: 'Title' }).fill("");
    await page.getByRole('textbox', { name: 'Details' }).fill("");

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Title is required.')).toBeVisible();
    await expect(page.getByText('Detail is required.')).toBeVisible();
  });

  test("removing title input and saving will show an error on title", async ({ page }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page.getByRole('row', { name: `${id}-edit-button` }).getByRole('button');
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await page.getByRole('textbox', { name: 'Title' }).fill("");

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Title is required.')).toBeVisible();
  });

  test("removing detail input and saving will show an error on detail", async ({ page }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page.getByRole('row', { name: `${id}-edit-button` }).getByRole('button');
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await page.getByRole('textbox', { name: 'Details' }).fill("");

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Detail is required.')).toBeVisible();
  });

  test("setting more than 15 characters on title and saving will show an error", async ({ page }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page.getByRole('row', { name: `${id}-edit-button` }).getByRole('button');
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await page.getByRole('textbox', { name: 'Title' }).fill(generateRandomString(16));

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Title must be 15 characters or less.')).toBeVisible();
  });

  test("setting more than 300 characters on detail and saving will show an error", async ({ page }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page.getByRole('row', { name: `${id}-edit-button` }).getByRole('button');
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await page.getByRole('textbox', { name: 'Details' }).fill(generateRandomString(301));

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Detail must be 300 characters or less.')).toBeVisible();
  });

  // TODO: Add successful update testing
});