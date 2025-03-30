import { test, expect } from "@playwright/test";

test("logging in with correct credentials should redirect to todos page showing his own todos", async ({
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

  await expect(page).toHaveURL("http://localhost:5173/todos");
  // Select all elements with the class `.todo-title`
  const todoTitles = await page.locator('.todo-title').all();

  // Loop through each element and check if it contains "admin "
  for (const title of todoTitles) {
      await expect(title).toContainText('admin ');
  }
});

test.describe("status and priority filtering", () => {
  test.beforeEach(async ({ page, context}) => {
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

  test("filtering of not started todos must work", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:5173/todos");
    await page.getByRole('button', { name: 'filter icon Filter' }).click();
    await page.getByRole('menuitem', { name: 'Status' }).hover();
    await page.getByRole('menuitem', { name: 'Not Started' }).click();
  
    const todoStatuses = await page.locator('.todo-status').all();
    for (const text of todoStatuses) {
      await expect(text).toContainText('Not Started');
    }
  });
  
  test("filtering of in progress todos must work", async ({ page }) => {  
    await expect(page).toHaveURL("http://localhost:5173/todos");
    await page.getByRole('button', { name: 'filter icon Filter' }).click();
    await page.getByRole('menuitem', { name: 'Status' }).hover();
    await page.getByRole('menuitem', { name: 'In Progress' }).click();
  
    const todoStatuses = await page.locator('.todo-status').all();
    for (const text of todoStatuses) {
      await expect(text).toContainText('In Progress');
    }
  });
  
  test("filtering of completed todos must work", async ({ page }) => {  
    await expect(page).toHaveURL("http://localhost:5173/todos");
    await page.getByRole('button', { name: 'filter icon Filter' }).click();
    await page.getByRole('menuitem', { name: 'Status' }).hover();
    await page.getByRole('menuitem', { name: 'Completed' }).click();
  
    const todoStatuses = await page.locator('.todo-status').all();
    for (const text of todoStatuses) {
      await expect(text).toContainText('Completed');
    }
  });
  
  test("filtering of low todos must work", async ({ page }) => {  
    await expect(page).toHaveURL("http://localhost:5173/todos");
    await page.getByRole('button', { name: 'filter icon Filter' }).click();
    await page.getByRole('menuitem', { name: 'Priority' }).hover();
    await page.getByRole('menuitem', { name: 'Low' }).click();
  
    const todoPriorities = await page.locator('.todo-priority').all();
    for (const text of todoPriorities) {
      await expect(text).toContainText('Low');
    }
  });
  
  test("filtering of high todos must work", async ({ page }) => {  
    await expect(page).toHaveURL("http://localhost:5173/todos");
    await page.getByRole('button', { name: 'filter icon Filter' }).click();
    await page.getByRole('menuitem', { name: 'Priority' }).hover();
    await page.getByRole('menuitem', { name: 'high' }).click();
  
    const todoPriorities = await page.locator('.todo-priority').all();
    for (const text of todoPriorities) {
      await expect(text).toContainText('High');
    }
  });
  
  test("filtering of urgent todos must work", async ({ page }) => {  
    await expect(page).toHaveURL("http://localhost:5173/todos");
    await page.getByRole('button', { name: 'filter icon Filter' }).click();
    await page.getByRole('menuitem', { name: 'Priority' }).hover();
    await page.getByRole('menuitem', { name: 'Critical' }).click();
  
    const todoPriorities = await page.locator('.todo-priority').all();
    for (const text of todoPriorities) {
      await expect(text).toContainText('Urgent');
    }
  });
});

test("clicking new task must redirect to create task form", async ({ page, context }) => {
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
  await expect(page).toHaveURL("http://localhost:5173/todos/new");
});

test("clicking a task must redirect to view task page", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await responsePromise;

  const firstItem = page.locator(".todo-title").first();
  const id = await firstItem.getAttribute("data-id");
  const title = await firstItem.textContent();
  await firstItem.click();

  await expect(page).toHaveURL(`http://localhost:5173/todos/${id}`);
  const todoTitleInViewPage = await page.locator(".todo-title").first().textContent();
  expect(todoTitleInViewPage).toContain(title);
});

test("clicking the pencil icon must redirect to edit task page", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");

  await page.getByRole("textbox", { name: "User Name" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123!");

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await responsePromise;

  const item = page.locator(".todo-title").first();
  const id = await item.getAttribute("data-id");
  const title = await item.textContent();
  const pencilButton = page.getByRole('row', { name: `${id}-edit-button` }).getByRole('button');
  await pencilButton.click();

  await expect(page).toHaveURL(`http://localhost:5173/todos/${id}/edit`);
  await expect(page.getByRole('textbox', { name: 'Title' })).toHaveValue(title);
});