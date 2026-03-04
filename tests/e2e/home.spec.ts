import { expect, test } from "@playwright/test";

test("renders health signal dashboard hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /global resilience telemetry for modern response teams/i })).toBeVisible();
  await expect(page.getByPlaceholder(/type a country name/i)).toBeVisible();
});
