import { test, expect } from "@playwright/test";

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

test.describe("create todo", () => {
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

    await page.getByRole('button', { name: 'plus icon New Task' }).click();
  });

  test("saving without title and details must show errors for title and detail", async ({ page }) => {
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Title is required.')).toBeVisible();
    await expect(page.getByText('Detail is required.')).toBeVisible();
  });

  test("saving without title must show an error on title", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Details' }).fill("Test details");
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Title is required.')).toBeVisible();
  });

  test("saving without detail must show an error on details", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Title' }).fill("Test title");
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Detail is required.')).toBeVisible();
  });

  test("saving with title with more than 15 characters will show an error", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Title' }).fill(generateRandomString(16));
    await page.getByRole('textbox', { name: 'Details' }).fill("Test details");

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Title must be 15 characters or less.')).toBeVisible();
  });

  test("saving with detail with more than 300 characters will show an error", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Title' }).fill("Test title");
    await page.getByRole('textbox', { name: 'Details' }).fill(generateRandomString(301));

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Detail must be 300 characters or less.')).toBeVisible();
  });

  test("saving with correct inputs must redirect to the todo detail page", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Title' }).fill("Test title");
    await page.getByRole('textbox', { name: 'Details' }).fill("Test details");

    const responsePromise = page.waitForResponse((resp) =>
      resp.url().includes("/api/todos") && resp.request().method() === "POST"
    );
    await page.getByRole('button', { name: 'Save' }).click();
    const response = await responsePromise;

    expect(response.ok()).toBe(true);
    const responseJson = await response.json();
    expect(responseJson?.data?.todo?.id).toBeTruthy();

    const id = responseJson.data.todo.id;
    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    const todoTitleInViewPage = await page.locator(".todo-title").first().textContent();
    expect(todoTitleInViewPage).toEqual("Test title");
  })
});