import { test, expect } from '@playwright/test';
import { curriculum } from '../../src/data/curriculum';

test('every lesson page renders and every Copy button copies its complete script', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  for (const project of curriculum) {
    await page.getByRole('button', { name: project.title, exact: true }).click();
    await expect(page.getByRole('heading', { name: project.title, exact: true })).toBeVisible();
    const content = project.content!;
    const pages = content.pages?.length ? content.pages : [{ title: '', content }];
    for (let i = 0; i < pages.length; i++) {
      if (i > 0) await page.getByRole('button', { name: 'Next', exact: true }).first().click();
      if (pages[i].content.code) {
        await expect(page.locator('pre code')).toHaveText(pages[i].content.code);
        await page.getByRole('button', { name: /^(Copy|Copied!)$/ }).click();
        await expect.poll(async () => (await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n')).toBe(pages[i].content.code.replace(/\r\n/g, '\n'));
      }
    }
  }
  expect(errors).toEqual([]);
});

test('complete a lesson, save a notebook entry and keep progress after reload without a backend', async ({ page }) => {
  const apiCalls: string[] = [];
  page.on('request', request => { if (request.url().includes('/api/')) apiCalls.push(request.url()); });
  await page.goto('/');
  const project = curriculum[0];
  await page.getByRole('button', { name: project.title, exact: true }).click();
  const count = project.content!.pages?.length ?? 1;
  for (let i = 1; i < count; i++) await page.getByRole('button', { name: 'Next', exact: true }).first().click();
  await page.getByRole('button', { name: 'Complete Project & Claim Badge' }).click();
  for (const field of ['whatWorked', 'whatDidnt', 'whatChanged', 'oneThingLearned']) {
    await page.locator(`textarea[name="${field}"]`).fill(`Test reflection: ${field}`);
  }
  await page.getByRole('button', { name: 'Save Entry & Complete' }).click();
  await expect(page.getByText('Project Completed & Badge Earned!')).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Lab Notebook', exact: true }).click();
  await expect(page.getByText('Test reflection: whatWorked')).toBeVisible();
  expect(apiCalls).toEqual([]);
});

test('malformed stored progress recovers and blocked storage keeps the app usable', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('rpi-lab-progress', JSON.stringify({projectStatuses: null, badges: null, labNotebook: [null]})));
  await page.goto('/');
  await expect(page.getByRole('main').getByRole('heading', { name: 'picklePi', exact: true })).toBeVisible();
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new DOMException('Full', 'QuotaExceededError'); }; });
  await page.getByRole('button', { name: curriculum[0].title, exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Your browser cannot save progress');
  await expect(page.getByRole('heading', { name: curriculum[0].title, exact: true })).toBeVisible();
});

test('mobile navigation, theme, dictionary and pinout remain usable', async ({ page }) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  await page.getByRole('button', {name: 'Switch to light mode'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  for (const tab of ['Dictionary', 'GPIO Pinout', 'Progress Tracker', 'Lab Notebook']) {
    await page.getByRole('button', {name: 'Open menu'}).click();
    await page.getByRole('button', {name: tab, exact: true}).click();
    await expect(page.locator('main')).not.toBeEmpty();
  }
});
