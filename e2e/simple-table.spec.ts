import { test, expect } from "@playwright/test";

test("app loads and simple table displays movies", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("VW DIGITAL:HUB Frontend technical test");

  await expect(
    page.getByRole("heading", { name: "Simple Movie Table" })
  ).toBeVisible();

  await expect(
    page.getByPlaceholder(
      "Search movies by title, date, rating, popularity, language..."
    )
  ).toBeVisible();

  await expect(page.locator("table")).toBeVisible();

  await expect(page.locator("tbody tr")).toHaveCount(25);

  await expect(page.getByText("Title")).toBeVisible();
  await expect(page.getByText("Release Date")).toBeVisible();
  await expect(page.getByText("Rating")).toBeVisible();
  await expect(page.getByText("Popularity")).toBeVisible();
  await expect(page.getByText("Language")).toBeVisible();
  await expect(page.getByText("Actions")).toBeVisible();
});
