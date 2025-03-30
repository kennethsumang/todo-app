import { test, expect } from "@playwright/test";

test("register fields must be visible when navigated from sign in page", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/");

  await page.getByRole("link", { name: "Sign up." }).click();

  await expect(page).toHaveURL("http://localhost:5173/register");
  await expect(page.getByRole("textbox", { name: "User Name" })).toBeEditable();
  await expect(
    page.getByRole("textbox", { name: "Password", exact: true })
  ).toBeEditable();
  await expect(
    page.getByRole("textbox", { name: "Retype Password" })
  ).toBeEditable();
  await expect(
    page.getByRole("button", { name: "Sign Up", exact: true })
  ).toBeVisible();
});

test("register fields must be visible when there is no cookies and register page is accessed", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/register");

  await expect(page.getByRole("textbox", { name: "User Name" })).toBeEditable();
  await expect(
    page.getByRole("textbox", { name: "Password", exact: true })
  ).toBeEditable();
  await expect(
    page.getByRole("textbox", { name: "Retype Password" })
  ).toBeEditable();
  await expect(
    page.getByRole("button", { name: "Sign Up", exact: true })
  ).toBeVisible();
});

test("username, password, and retype password must show errors when they are all empty", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/register");
  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await expect(page.getByText("Username is required.")).toBeVisible();
  await expect(
    page.getByText("Password is required.", { exact: true })
  ).toBeVisible();
  await expect(page.getByText("Retyped Password is required.")).toBeVisible();
});

test("username must show error when it is empty", async ({ page, context }) => {
  await context.clearCookies();

  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("admin123!");
  await page
    .getByRole("textbox", { name: "Retype Password", exact: true })
    .fill("admin123!");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await expect(page.getByText("Username is required.")).toBeVisible();
});

test("password must show error when it is empty", async ({ page, context }) => {
  await context.clearCookies();

  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "User Name", exact: true })
    .fill("admin");
  await page
    .getByRole("textbox", { name: "Retype Password", exact: true })
    .fill("admin123!");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await expect(page.getByText("Password is required.")).toBeVisible();
});

test("retype password must show error when it is empty", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "User Name", exact: true })
    .fill("admin");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("admin123!");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await expect(page.getByText("Retyped Password is required.")).toBeVisible();
});

test("password must show an error when it has a character not in the allowed characters", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "User Name", exact: true })
    .fill("admin");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("admin123!<>");
  await page
    .getByRole("textbox", { name: "Retype Password", exact: true })
    .fill("admin123!<>");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await expect(
    page.getByText(
      "Password can only contain letters, numbers, spaces, and the special characters: !, #, (, ), _, -."
    )
  ).toBeVisible();
});

test("retype password must show an error when it is not the same with the password", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "User Name", exact: true })
    .fill("admin");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("admin123!");
  await page
    .getByRole("textbox", { name: "Retype Password", exact: true })
    .fill("admin124!<>");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await expect(page.getByText("Passwords do not match.")).toBeVisible();
});

test("valid inputs must register successfully and user must be able to login to that account", async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "User Name", exact: true })
    .fill("admintest");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("admintest123!");
  await page
    .getByRole("textbox", { name: "Retype Password", exact: true })
    .fill("admintest123!");
  const registerResponsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/register")
  );
  await page.getByRole("button", { name: "Sign Up", exact: true }).click();
  await registerResponsePromise;

  await expect(page.getByText(
    "Registered successfully. Please login to continue."
  )).toBeVisible();

  // login
  await expect(page).toHaveURL("http://localhost:5173");
  await page.getByRole("textbox", { name: "User Name" }).fill("admintest");
  await page.getByRole("textbox", { name: "Password" }).fill("admintest123!");

  const loginResponsePromise = page.waitForResponse((resp) =>
    resp.url().includes("/api/auth/login")
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await loginResponsePromise;

  await expect(page.getByText("To-do")).toBeVisible();
  await expect(page.getByText("admintest")).toBeVisible();
});