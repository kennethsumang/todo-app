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
