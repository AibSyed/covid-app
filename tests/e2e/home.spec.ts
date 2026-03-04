import { expect, test } from "@playwright/test";

test("renders command center dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Global Health Signal Command Center" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Global Trend Drift" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Regional Comparison Grid" })).toBeVisible();

  await page.getByRole("link", { name: "Trends" }).click();
  await expect(page).toHaveURL(/\/trends$/);
  await expect(page.getByRole("heading", { name: "Timeline Drift and Recency Intelligence" })).toBeVisible();
});
