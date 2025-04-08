import { test, expect } from "@playwright/test";

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  test("removing title and detail inputs and saving will show an error on title and details", async ({
    page,
  }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page
      .getByRole("row", { name: `${id}-edit-button` })
      .getByRole("button");
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
    await page.getByRole("textbox", { name: "Title" }).fill("");
    await page.getByRole("textbox", { name: "Details" }).fill("");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Title is required.")).toBeVisible();
    await expect(page.getByText("Detail is required.")).toBeVisible();
  });

  test("removing title input and saving will show an error on title", async ({
    page,
  }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page
      .getByRole("row", { name: `${id}-edit-button` })
      .getByRole("button");
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
    await page.getByRole("textbox", { name: "Title" }).fill("");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Title is required.")).toBeVisible();
  });

  test("removing detail input and saving will show an error on detail", async ({
    page,
  }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page
      .getByRole("row", { name: `${id}-edit-button` })
      .getByRole("button");
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
    await page.getByRole("textbox", { name: "Details" }).fill("");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Detail is required.")).toBeVisible();
  });

  test("setting more than 25 characters on title and saving will show an error", async ({
    page,
  }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page
      .getByRole("row", { name: `${id}-edit-button` })
      .getByRole("button");
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
    await page
      .getByRole("textbox", { name: "Title" })
      .fill(generateRandomString(26));

    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByText("Title must be 25 characters or less.")
    ).toBeVisible();
  });

  test("setting more than 300 characters on detail and saving will show an error", async ({
    page,
  }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page
      .getByRole("row", { name: `${id}-edit-button` })
      .getByRole("button");
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
    await page
      .getByRole("textbox", { name: "Details" })
      .fill(generateRandomString(301));

    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByText("Detail must be 300 characters or less.")
    ).toBeVisible();
  });

  test("valid inputs will update the todo successfully and redirect to view page", async ({
    page,
  }) => {
    const item = page.locator(".todo-title").first();
    const id = await item.getAttribute("data-id");
    const pencilButton = page
      .getByRole("row", { name: `${id}-edit-button` })
      .getByRole("button");
    await pencilButton.click();

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
    await page.getByRole("textbox", { name: "Title" }).fill("New title");
    await page
      .getByRole("textbox", { name: "Details" })
      .fill("New edited details");

    const responsePromise = page.waitForResponse(
      (resp) =>
        resp.url().includes(`/api/todos/${id}`) &&
        resp.request().method() === "PUT"
    );
    await page.getByRole("button", { name: "Save" }).click();
    await responsePromise;

    await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);

    const todoTitleInViewPage = await page
      .locator(".todo-title")
      .first()
      .textContent();
    const todoDetailInViewPage = await page
      .locator(".todo-details")
      .first()
      .textContent();
    expect(todoTitleInViewPage).toEqual("New title");
    expect(todoDetailInViewPage).toEqual("New edited details");
  });
});
