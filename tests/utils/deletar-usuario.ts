import { expect, type Page } from '@playwright/test';

export async function deletarUsuario(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByTestId('account-deleted')).toBeVisible();
  await page.getByTestId('continue-button').click();
}
