import { test, expect } from "@playwright/test";
import { curriculum } from "../../src/data/curriculum";

async function expectNoPageOverflow(page: import("@playwright/test").Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const main = page.getByRole("main");
  expect(
    await main.evaluate(
      (element) => element.scrollWidth <= element.clientWidth + 1,
    ),
  ).toBe(true);
}

test("workshop catalog filters, searches, and opens a project from the home screen", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome to your workshop." }),
  ).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(13);
  await page.screenshot({
    path: "test-results/remix-desktop-dark.png",
    fullPage: false,
  });
  await page.getByRole("button", { name: "First sparks", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(4);
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("not-a-project");
  await expect(
    page.getByRole("heading", { name: "No sparks here just yet." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show all projects", exact: true })
    .click();
  await expect(page.getByRole("article")).toHaveCount(13);
  await page.getByRole("searchbox", { name: "Search projects" }).fill("sonar");
  await expect(page.getByRole("article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Start Sonar Proximity Alert" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Sonar Proximity Alert", exact: true }),
  ).toBeVisible();
  await expectNoPageOverflow(page);
});

test("phone workshop, navigation focus, and desktop collapse remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expectNoPageOverflow(page);
  await page.screenshot({
    path: "test-results/remix-mobile-dark.png",
    fullPage: false,
  });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.getByRole("button", { name: "picklePi home" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: curriculum.at(-1)!.title, exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("button", { name: curriculum[0].title, exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: curriculum[0].title, exact: true }),
  ).toBeVisible();
  await expectNoPageOverflow(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await page.getByRole("button", { name: "Dictionary", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Learning Dictionary" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("button", { name: curriculum[1].title, exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: curriculum[1].title, exact: true }),
  ).toBeVisible();
  await expectNoPageOverflow(page);
});

test("themes persist and all reference views fit the phone screen", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({
    path: "test-results/remix-desktop-light.png",
    fullPage: false,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/remix-mobile-light.png",
    fullPage: false,
  });
  for (const tab of [
    "Dictionary",
    "GPIO Pinout",
    "Progress Tracker",
    "Lab Notebook",
  ]) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: tab, exact: true }).click();
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toBeVisible();
    await expectNoPageOverflow(page);
  }
  await page.getByRole("button", { name: "Try your first project" }).click();
  await expect(
    page.getByRole("heading", { name: curriculum[0].title, exact: true }),
  ).toBeVisible();
});

test("notebook dialog traps focus, dismisses with Escape, and saves one reflection", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: curriculum[0].title, exact: true })
    .click();
  await page
    .getByRole("button", { name: /Page 7:/ })
    .first()
    .click();
  const complete = page.getByRole("button", {
    name: "Complete Project & Claim Badge",
  });
  await complete.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Close notebook" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Save Entry & Complete" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(complete).toBeFocused();
  await complete.click();
  await page
    .getByLabel("What worked?", { exact: true })
    .fill("I made a light change color.");
  await page
    .getByLabel("One thing you learned", { exact: true })
    .fill("Trying again helps.");
  await page.getByRole("button", { name: "Save Entry & Complete" }).click();
  await expect(
    page.getByText("Project Completed & Badge Earned!"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await expect(page.getByRole("article").first()).toContainText("Completed");
  await page.getByRole("button", { name: "Lab Notebook", exact: true }).click();
  await expect(page.getByText("I made a light change color.")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Lab Notebook", exact: true }).click();
  await expect(page.getByText("I made a light change color.")).toHaveCount(1);
});

test("clipboard failures explain manual copying and page changes clear the message", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: curriculum[0].title, exact: true })
    .click();
  await page
    .getByRole("button", { name: /Page 3:/ })
    .first()
    .click();
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new DOMException("Blocked", "NotAllowedError");
    };
  });
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(
    page.getByText(
      "Clipboard access is unavailable. Select the code below and copy it manually.",
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).first().click();
  await expect(
    page.getByText(
      "Clipboard access is unavailable. Select the code below and copy it manually.",
    ),
  ).toHaveCount(0);
});
