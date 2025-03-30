import { test, expect } from "@playwright/test";

test.describe("delete todo", () => {
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

  test("clicking delete button will show a confirm dialog", async ({ page }) => {
    const firstItem = page.locator(".todo-title").first();
    const id = await firstItem.getAttribute("data-id");
    const title = await firstItem.textContent();
    await firstItem.click();
  
    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await expect(page.getByRole('button', { name: 'trash icon' })).toBeVisible();
    await page.getByRole('button', { name: 'trash icon' }).click();

    await expect(page.getByRole('heading', { name: 'Confirm Delete' })).toBeVisible();
    const dialogText = await page.locator(".todo-dialog-content-text").first().textContent();
    expect(dialogText).toContain(title);
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test("clicking cancel must close the dialog", async ({ page }) => {
    const firstItem = page.locator(".todo-title").first();
    const id = await firstItem.getAttribute("data-id");
    await firstItem.click();
  
    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await expect(page.getByRole('button', { name: 'trash icon' })).toBeVisible();
    await page.getByRole('button', { name: 'trash icon' }).click();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading', { name: 'Confirm Delete' })).toBeHidden();
  });

  test("confirming the delete dialog must delete it and return to dashboard", async ({ page }) => {
    const firstItem = page.locator(".todo-title").first();
    const id = await firstItem.getAttribute("data-id");
    await firstItem.click();
  
    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
    await expect(page.getByRole('button', { name: 'trash icon' })).toBeVisible();
    await page.getByRole('button', { name: 'trash icon' }).click();

    const responsePromise = page.waitForResponse((resp) =>
      resp.url().includes(`/api/todos/${id}`) && resp.request().method() === "DELETE"
    );
    await page.getByRole('button', { name: 'Delete' }).click();
    await responsePromise;

    await expect(page.getByText("Todo successfully deleted.")).toBeVisible();
    await expect(page).toHaveURL("http://localhost:5173/todos");
  });
});


