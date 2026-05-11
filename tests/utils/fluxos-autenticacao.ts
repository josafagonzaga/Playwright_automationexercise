import { expect, type Page } from '@playwright/test';

export async function acessarPaginaInicial(page: Page): Promise<void> {
  await page.goto('http://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
}

export async function abrirTelaLoginCadastro(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Signup / Login' }).click();
}

export async function fazerLogin(
  page: Page,
  email: string,
  senha: string
): Promise<void> {
  const formularioLogin = page.locator('form').filter({ hasText: 'Login' });

  await formularioLogin.getByPlaceholder('Email Address').fill(email);
  await page.getByPlaceholder('Password').fill(senha);
  await formularioLogin.getByRole('button', { name: 'Login' }).click();
}
